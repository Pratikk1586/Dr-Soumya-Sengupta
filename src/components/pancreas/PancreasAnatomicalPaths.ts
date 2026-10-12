/**
 * Realistic Anatomical Paths for the Human Pancreas, Duodenum, Spleen & Vascular System.
 * ViewBox: 0 0 540 500
 *
 * Refined Medical Anatomical Proportions:
 * - Duodenal C-loop on anatomical right (viewer's left)
 * - Pancreatic Head snug inside the C-loop with ZERO gap
 * - Neck narrowing, body slender and gently arching across midline
 * - Tail extending to and reaching the splenic hilum
 * - Continuous thin pale-yellow Duct of Wirsung joining duodenum at Ampulla of Vater
 * - Splenic vein running along posterior surface of body/tail; tortuous splenic artery above it
 * - Oval spleen with subtle hilum notch and glossy highlight
 * - Contact shadow along duodenal-pancreatic junction
 */

export const REALISTIC_PATHS = {
  // 1. STOMACH SILHOUETTE (Soft retroperitoneal context)
  stomachSilhouette:
    'M 180 85 C 230 65, 330 60, 420 85 C 460 100, 485 130, 475 165 C 465 190, 430 205, 390 205 C 330 205, 270 215, 220 230 C 180 240, 160 210, 165 170 C 170 130, 160 100, 180 85 Z',

  stomachRugae: [
    'M 220 105 C 270 95, 340 100, 395 120',
    'M 240 135 C 290 128, 350 135, 410 150',
    'M 270 165 C 315 160, 365 168, 420 180',
  ],

  // 2. DUODENAL C-LOOP (Salmon-pink, D1 bulb, D2 descending, D3 horizontal, D4 ascending)
  duodenumMain:
    'M 175 180 C 145 172, 110 182, 88 208 C 65 236, 60 282, 66 332 C 72 376, 102 414, 150 422 C 195 428, 238 410, 260 382 C 270 368, 264 350, 246 348 C 228 346, 212 358, 188 364 C 152 372, 130 354, 122 322 C 116 290, 116 250, 134 228 C 148 214, 166 216, 180 220 Z',

  duodenumLumenHighlight:
    'M 160 190 C 135 188, 104 205, 86 235 C 72 268, 68 312, 76 348 C 86 388, 120 410, 158 412 C 195 412, 232 396, 250 375',

  // Plicae circulares (circular mucosal folds inside duodenum)
  duodenalFolds: [
    'M 142 188 C 132 196, 122 206, 116 215',
    'M 120 208 C 108 222, 100 236, 94 250',
    'M 102 238 C 90 256, 84 274, 82 292',
    'M 92 278 C 82 298, 80 318, 82 338',
    'M 90 324 C 86 346, 92 366, 104 382',
    'M 106 366 C 116 384, 132 398, 150 404',
    'M 142 392 C 160 406, 180 410, 202 406',
    'M 188 386 C 208 394, 226 388, 240 376',
  ],

  // 3. PANCREATIC HEAD & UNCINATE PROCESS (Snug inside C-loop with ZERO gap)
  headParenchyma:
    'M 226 230 C 200 212, 174 204, 148 206 C 130 212, 120 230, 118 255 C 118 290, 124 322, 132 352 C 156 364, 188 366, 218 360 C 238 350, 248 332, 238 312 C 230 286, 226 260, 226 230 Z',

  uncinateProcess:
    'M 218 340 C 230 358, 248 362, 258 350 C 265 340, 260 326, 246 318 C 235 312, 222 322, 218 340 Z',

  // Contact shadow path along junction between duodenum and head of pancreas
  contactShadowDuodenum:
    'M 172 208 C 142 216, 120 242, 118 278 C 118 322, 126 352, 156 364 C 182 368, 214 366, 236 354',

  // 4. PANCREATIC BODY (Slender, gently arching with narrowed neck)
  bodyParenchyma:
    'M 218 230 C 242 224, 280 215, 325 208 C 365 202, 385 198, 398 196 C 398 214, 385 220, 365 224 C 325 234, 280 244, 242 254 C 220 260, 214 246, 218 230 Z',

  // 5. PANCREATIC TAIL (Slender, tapering and reaching the splenic hilum)
  tailParenchyma:
    'M 398 196 C 418 190, 438 184, 454 186 C 454 188, 438 194, 418 204 C 405 210, 398 214, 398 196 Z',

  // Combined overall pancreas silhouette for soft retroperitoneal drop shadow
  pancreasGroupSilhouette:
    'M 175 180 C 110 182, 60 282, 66 332 C 72 376, 102 414, 150 422 C 195 428, 242 410, 260 382 C 262 360, 254 340, 248 332 C 280 244, 365 224, 418 204 C 438 194, 454 188, 455 186 C 472 250, 520 202, 518 172 C 494 148, 466 135, 450 182 C 438 184, 398 196, 325 208 C 280 216, 242 226, 224 230 C 190 220, 158 218, 134 228 C 148 214, 166 216, 180 220 Z',

  // Lobulation surface contours (nodular acinar bumps on parenchyma)
  parenchymalLobules: [
    'M 148 245 C 158 240, 168 248, 165 258 C 160 265, 150 262, 148 245 Z',
    'M 172 278 C 182 272, 194 280, 190 290 C 185 298, 174 294, 172 278 Z',
    'M 145 298 C 155 290, 166 298, 164 308 C 160 316, 148 312, 145 298 Z',
    'M 180 328 C 190 322, 202 330, 198 340 C 192 346, 182 342, 180 328 Z',
    'M 255 234 C 268 228, 278 235, 275 244 C 270 250, 258 248, 255 234 Z',
    'M 295 224 C 308 218, 320 225, 316 234 C 312 240, 300 238, 295 224 Z',
    'M 340 214 C 352 208, 364 215, 360 224 C 356 230, 345 228, 340 214 Z',
    'M 382 204 C 394 198, 404 205, 400 214 C 396 220, 386 218, 382 204 Z',
    'M 425 194 C 435 188, 444 194, 440 200 C 436 205, 428 204, 425 194 Z',
  ],

  // 6. MAIN PANCREATIC DUCT (Continuous, thin pale-yellow tube, joining duodenum at head)
  ductOfWirsung:
    'M 450 186 C 422 192, 380 202, 335 218 C 290 234, 254 246, 226 248 C 198 250, 168 266, 148 288 C 136 300, 126 308, 118 308',

  // 7. VASCULAR AXIS (Splenic Vein posterior to body/tail; tortuous Splenic Artery above it)
  // Splenic Vein (Royal blue, posterior surface of body and tail)
  splenicVein:
    'M 452 188 C 422 196, 378 208, 332 222 C 292 234, 258 244, 230 252',

  // Splenic Artery (Crimson red, characteristically tortuous along superior border ABOVE vein)
  splenicArtery:
    'M 224 222 C 238 200, 256 196, 268 210 C 282 222, 302 196, 318 190 C 334 186, 350 204, 366 194 C 382 184, 396 198, 414 188 C 428 178, 442 184, 452 180',

  splenicArteryBranches: [
    'M 268 210 L 274 222',
    'M 318 190 L 324 206',
    'M 366 194 L 372 206',
    'M 414 188 L 418 200',
    'M 448 181 L 454 174',
    'M 450 183 L 456 190',
  ],

  // Portal Vein Confluence & Superior Mesenteric Vein (SMV)
  portalVeinConfluence:
    'M 230 252 C 238 234, 244 208, 250 185 C 260 188, 266 205, 260 230 C 255 248, 248 270, 242 310 C 236 350, 230 370, 224 385 L 214 382 C 220 365, 226 342, 232 305 C 236 278, 234 262, 230 252 Z',

  // Superior Mesenteric Artery (SMA)
  superiorMesentericArtery:
    'M 242 220 C 246 245, 244 280, 238 320 C 232 350, 226 375, 220 388',

  // 8. SPLEEN (Oval shape with subtle hilum notch and glossy highlight)
  spleenOrgan:
    'M 466 135 C 494 148, 518 172, 520 202 C 512 228, 490 248, 472 250 C 455 222, 448 202, 446 186 C 445 178, 452 165, 466 135 Z',

  spleenHilumNotch:
    'M 445 178 C 448 186, 448 194, 452 202',

  spleenGlossyHighlight:
    'M 470 142 C 492 152, 510 172, 512 195 C 506 182, 492 165, 474 152 Z',
};

