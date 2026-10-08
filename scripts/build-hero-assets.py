#!/usr/bin/env python3
"""
Turns the intro video into a seamless looping hero clip.

Usage:
  python3 scripts/build-hero-assets.py path/to/intro.mp4

Crop is set for a 1280x720 source where the person stands at x~543-740 (centre ~641).
Edit CROP below if you re-film. The crop must keep the 4:5 ratio (768x960 output).
Requires: ffmpeg, ffprobe, numpy (and Pillow for the stills).
"""
import subprocess, sys, os, tempfile, wave
import numpy as np

SRC = sys.argv[1] if len(sys.argv) > 1 else "intro.mp4"
OUT = os.path.join(os.path.dirname(__file__), "..", "public")
HERO = os.path.join(OUT, "hero")
os.makedirs(HERO, exist_ok=True)

# w:h:x:y  (4:5 ratio -> scaled to 768x960)
CROP = "528:660:377:40"
W, H = 768, 960
# white point: this backdrop sits at ~0.92, so 0.93 clips it to pure white (spec default 0.98)
XF = 0.5        # cross-fade length in seconds
SR = 48000
FPS = 24


def run(*a):
    print("+", " ".join(map(str, a)))
    subprocess.run(a, check=True)


def duration(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nw=1:nk=1", path], capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


tmp = tempfile.mkdtemp()
pre = os.path.join(tmp, "pre.mkv")

# 1+2. crop around the person, scale, make the backdrop pure white
run("ffmpeg", "-v", "error", "-y", "-i", SRC, "-an",
    "-vf", f"crop={CROP},scale={W}:{H}:flags=lanczos,"
           "format=gbrp,colorlevels=rimax=0.93:gimax=0.93:bimax=0.93,fps=%d,format=yuv420p" % FPS,
    "-c:v", "ffv1", "-pix_fmt", "yuv420p", pre)

D = min(duration(pre), 10.0)
body_len = D - 2 * XF

# 3a. video: [blend(tail -> head)] + body  => length D - XF, loops with no jump
head = os.path.join(tmp, "head.mkv")
body = os.path.join(tmp, "body.mkv")
tail = os.path.join(tmp, "tail.mkv")
run("ffmpeg", "-v", "error", "-y", "-i", pre, "-t", str(XF), "-c:v", "ffv1", "-pix_fmt", "yuv420p", head)
run("ffmpeg", "-v", "error", "-y", "-ss", str(XF), "-i", pre, "-t", str(body_len), "-c:v", "ffv1", "-pix_fmt", "yuv420p", body)
run("ffmpeg", "-v", "error", "-y", "-ss", str(D - XF), "-i", pre, "-t", str(XF), "-c:v", "ffv1", "-pix_fmt", "yuv420p", tail)
blend = os.path.join(tmp, "blend.mkv")
run("ffmpeg", "-v", "error", "-y", "-i", tail, "-i", head,
    "-filter_complex", f"[0][1]xfade=transition=fade:duration={XF}:offset=0,format=yuv420p",
    "-c:v", "ffv1", "-pix_fmt", "yuv420p", blend)
loop_v = os.path.join(tmp, "loop_v.mkv")
lst = os.path.join(tmp, "list.txt")
with open(lst, "w") as f:
    f.write(f"file '{blend}'\nfile '{body}'\n")
run("ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c:v", "ffv1", "-pix_fmt", "yuv420p", loop_v)

# 3b. audio: same arrangement, equal-power cross-fade in numpy (sample-accurate)
raw = os.path.join(tmp, "a.wav")
run("ffmpeg", "-v", "error", "-y", "-i", SRC, "-vn", "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", raw)
with wave.open(raw) as w:
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768.0
n = int(round(D * SR))
a = np.pad(a, (0, max(0, n - len(a))))[:n]
x = int(round(XF * SR))
t = np.linspace(0, 1, x, endpoint=False)
fade_out, fade_in = np.cos(t * np.pi / 2), np.sin(t * np.pi / 2)
mix = a[n - x:] * fade_out + a[:x] * fade_in
loop_a = np.concatenate([mix, a[x:n - x]])
loop_a = np.clip(loop_a, -1, 1)
loop_wav = os.path.join(tmp, "loop.wav")
with wave.open(loop_wav, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((loop_a * 32767).astype(np.int16).tobytes())

# 4. exports (webm listed first in <source>)
run("ffmpeg", "-v", "error", "-y", "-i", loop_v, "-i", loop_wav,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
    "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest",
    os.path.join(HERO, "hero.mp4"))
run("ffmpeg", "-v", "error", "-y", "-i", loop_v, "-i", loop_wav,
    "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-pix_fmt", "yuv420p",
    "-c:a", "libopus", "-b:a", "80k", "-shortest",
    os.path.join(HERO, "hero.webm"))

# 5. stills: portrait bust (480x600, head-to-shirt) and Open Graph image
from PIL import Image
frame = os.path.join(tmp, "still.png")
run("ffmpeg", "-v", "error", "-y", "-ss", "4", "-i", pre, "-frames:v", "1", frame)
im = Image.open(frame).convert("RGB")           # 768x960, person centred
bust = im.crop((144, 40, 624, 640)).resize((480, 600), Image.LANCZOS)
bust.save(os.path.join(OUT, "portrait-bust.webp"), quality=88)
og = Image.new("RGB", (1200, 630), (244, 242, 238))
p = im.crop((0, 0, 768, 960)).resize((504, 630), Image.LANCZOS)
og.paste(p, (348, 0))
og.save(os.path.join(OUT, "og.jpg"), quality=88)
print("done:", HERO)
