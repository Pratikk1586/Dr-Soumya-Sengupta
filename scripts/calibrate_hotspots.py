from PIL import Image, ImageDraw
import json

lab = Image.open('src/assets/pancreas/pancreas-labelled.png').convert('RGB')
overlay = Image.new('RGBA', (1536, 1024), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Refined coordinates with anatomically precise C-loop for duodenum and exact organ margins
HOTSPOTS = {
    # 1. Gallbladder (Vesica biliaris)
    'gallbladder': [
        (140, 165), (150, 130), (180, 100), (230, 80), (290, 70), (350, 80), 
        (405, 110), (435, 145), (455, 180), (440, 205), (380, 215), (320, 205), 
        (250, 195), (190, 215), (155, 200), (140, 165)
    ],
    
    # 2. Common Bile Duct (Ductus choledochus)
    'bileDuct': [
        (435, 145), (455, 180), (468, 235), (458, 295), (435, 365), (415, 425),
        (405, 485), (390, 535), (355, 525), (370, 460), (395, 385), (420, 305),
        (435, 245), (435, 145)
    ],
    
    # 3. Stomach (Gaster)
    'stomach': [
        (620, 15), (700, 5), (820, 45), (950, 95), (1035, 175), (1075, 255),
        (1090, 340), (1035, 370), (950, 380), (860, 375), (780, 360), (700, 320),
        (620, 275), (550, 240), (490, 255), (450, 235), (440, 180), (475, 125),
        (535, 60), (620, 15)
    ],
    
    # 4. Duodenum (True C-loop ribbon hugging head of pancreas)
    'duodenum': [
        # Outer border from superior duodenal flexure around to ascending loop
        (260, 210), (330, 185), (415, 215), (425, 265), (360, 280), (280, 315),
        (215, 375), (170, 465), (145, 560), (155, 680), (200, 790), (285, 860),
        (395, 905), (520, 915), (660, 880), (770, 815), (845, 735), (885, 670),
        # Inner border looping back
        (855, 645), (815, 715), (730, 785), (630, 835), (510, 855), (390, 845),
        (310, 805), (250, 730), (230, 640), (245, 540), (275, 450), (325, 370),
        (385, 315), (410, 275), (330, 225), (260, 210)
    ],
    
    # 5. Head of Pancreas (Caput pancreatis)
    'pancreasHead': [
        (415, 385), (490, 375), (555, 405), (640, 435), (660, 490), (670, 550),
        (640, 620), (590, 690), (530, 720), (445, 715), (385, 660), (335, 580),
        (340, 485), (415, 385)
    ],
    
    # 6. Pancreatic Body (Corpus pancreatis)
    'pancreasBody': [
        (640, 435), (740, 410), (840, 385), (940, 375), (1050, 365), (1140, 355),
        (1160, 410), (1140, 470), (1050, 510), (940, 550), (840, 570), (740, 575),
        (660, 560), (640, 490), (640, 435)
    ],
    
    # 7. Pancreatic Tail (Cauda pancreatis)
    'pancreasTail': [
        (1140, 355), (1210, 335), (1270, 325), (1320, 355), (1335, 400), (1300, 435),
        (1240, 460), (1180, 470), (1140, 470), (1140, 355)
    ],
    
    # 8. Pancreatic Duct (Duct of Wirsung)
    'pancreaticDuct': [
        (375, 535), (425, 495), (485, 470), (565, 465), (655, 458), (755, 445),
        (855, 440), (955, 442), (1043, 461), (1140, 435), (1220, 405), (1280, 375),
        (1295, 385), (1230, 418), (1145, 448), (1050, 475), (960, 458), (860, 455),
        (760, 460), (660, 472), (570, 480), (490, 485), (430, 510), (380, 550),
        (375, 535)
    ],
    
    # 9. Spleen (Lien / Splen)
    'spleen': [
        (1210, 240), (1240, 180), (1290, 150), (1360, 155), (1425, 200), (1460, 270),
        (1465, 360), (1440, 450), (1395, 520), (1340, 560), (1280, 565), (1240, 510),
        (1255, 460), (1275, 410), (1260, 340), (1230, 300), (1210, 240)
    ],
    
    # 10. Vascular Axis (Splenic & Mesenteric Vessels)
    'vascularAxis': [
        (510, 35), (560, 25), (575, 95), (600, 130), (620, 210), (605, 280),
        (560, 280), (545, 210), (510, 35)
    ],
    'vascularAxisInferior': [
        (710, 580), (765, 575), (800, 610), (820, 670), (790, 715), (740, 720),
        (710, 670), (710, 580)
    ],
}

colors = {
    'gallbladder': (34, 197, 94, 110),
    'bileDuct': (16, 185, 129, 110),
    'stomach': (244, 63, 94, 90),
    'duodenum': (234, 88, 12, 100),
    'pancreasHead': (245, 158, 11, 110),
    'pancreasBody': (234, 179, 8, 110),
    'pancreasTail': (202, 138, 4, 110),
    'pancreaticDuct': (250, 204, 21, 200),
    'spleen': (168, 85, 247, 110),
    'vascularAxis': (59, 130, 246, 120),
    'vascularAxisInferior': (59, 130, 246, 120),
}

for name, pts in HOTSPOTS.items():
    color = colors.get(name, (14, 90, 107, 120))
    outline = (color[0], color[1], color[2], 230)
    draw.polygon(pts, fill=color, outline=outline, width=3)

# Draw Islets Inset circle
cx, cy, r = 1208, 734, 158
draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=(147, 51, 234, 90), outline=(168, 85, 247, 240), width=4)

# Draw duct dot
dcx, dcy, dr = 1043, 461, 16
draw.ellipse((dcx-dr, dcy-dr, dcx+dr, dcy+dr), fill=(255, 255, 255, 190), outline=(14, 90, 107, 255), width=3)

combined = Image.alpha_composite(lab.convert('RGBA'), overlay)
out_path = '/Users/pratik/.gemini/antigravity-ide/brain/ffa8c5c8-c262-49be-a404-ba4aae8e6512/debug_hotspots_complete.png'
combined.save(out_path)
print(f'Refined overlay saved to {out_path}')
