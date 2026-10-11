/**
 * Realistic Anatomical Paths for the Human Pancreas, Duodenum, Spleen & Vascular System.
 * ViewBox: 0 0 540 500
 *
 * Designed with medical anatomical proportions:
 * - Duodenal C-loop on the anatomical right (viewer's left)
 * - Pancreatic Head nestled inside the C-loop
 * - Pancreatic Neck, Body and Tail stretching obliquely across to the splenic hilum
 * - Main Pancreatic Duct (Duct of Wirsung) coursing through the gland
 * - Splenic Artery & Vein crossing along the postero-superior margin
 * - Deep maroon Spleen abutting the tail
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
    'M 175 185 C 150 175, 115 185, 95 210 C 72 238, 68 285, 75 330 C 82 370, 110 405, 155 412 C 195 418, 235 400, 255 375 C 265 362, 260 348, 245 345 C 230 342, 215 355, 195 360 C 160 368, 130 355, 120 325 C 112 295, 115 255, 135 235 C 150 220, 170 222, 185 228 Z',

  duodenumLumenHighlight:
    'M 160 195 C 135 192, 108 210, 92 238 C 78 268, 76 312, 85 348 C 96 385, 128 402, 165 402 C 198 402, 230 388, 245 368',

  // Plicae circulares (circular mucosal folds inside the duodenum)
  duodenalFolds: [
    'M 145 190 C 135 198, 125 208, 120 215',
    'M 125 210 C 112 222, 105 235, 100 248',
    'M 108 238 C 95 255, 90 272, 88 290',
    'M 98 275 C 88 295, 86 315, 88 335',
    'M 96 320 C 92 342, 98 360, 110 375',
    'M 112 360 C 122 378, 138 392, 155 398',
    'M 148 385 C 165 398, 185 402, 205 398',
    'M 190 380 C 208 388, 225 382, 238 372',
  ],

  // 3. PANCREATIC HEAD & UNCINATE PROCESS (Lobulated acinar parenchyma)
  headParenchyma:
    'M 185 228 C 170 238, 155 255, 150 275 C 145 295, 152 320, 168 338 C 182 355, 205 365, 228 362 C 248 358, 258 342, 252 325 C 248 312, 235 305, 225 302 C 210 298, 205 285, 212 270 C 220 252, 228 240, 240 235 C 225 228, 202 224, 185 228 Z',

  uncinateProcess:
    'M 215 330 C 225 348, 242 358, 255 352 C 265 345, 262 330, 250 320 C 238 312, 225 318, 215 330 Z',

  // 4. PANCREATIC BODY (Corpus pancreatis - acinar glandular bridge)
  bodyParenchyma:
    'M 240 235 C 255 230, 275 225, 305 220 C 335 215, 365 212, 388 208 C 392 222, 388 238, 375 248 C 350 262, 315 270, 278 275 C 255 278, 242 265, 238 250 C 235 242, 238 238, 240 235 Z',

  // 5. PANCREATIC TAIL (Cauda pancreatis - tapering into splenic hilum)
  tailParenchyma:
    'M 388 208 C 405 204, 425 198, 442 190 C 448 196, 446 205, 438 214 C 424 228, 405 238, 388 242 C 375 245, 382 225, 388 208 Z',

  // Lobulation surface contours (nodular bumps on parenchyma)
  parenchymalLobules: [
    'M 175 255 C 185 250, 195 258, 192 268 C 188 275, 178 272, 175 255 Z',
    'M 195 285 C 205 280, 218 288, 214 298 C 208 308, 196 302, 195 285 Z',
    'M 165 295 C 175 288, 186 295, 184 308 C 180 318, 168 312, 165 295 Z',
    'M 265 240 C 278 235, 290 242, 288 252 C 284 260, 270 258, 265 240 Z',
    'M 310 230 C 322 225, 335 232, 332 242 C 328 250, 315 248, 310 230 Z',
    'M 355 222 C 368 218, 380 225, 378 235 C 374 242, 360 240, 355 222 Z',
    'M 405 212 C 418 208, 428 215, 425 224 C 420 230, 410 226, 405 212 Z',
  ],

  // 6. MAIN PANCREATIC DUCT (Duct of Wirsung + side tributaries)
  ductOfWirsung:
    'M 438 195 C 415 204, 380 214, 340 222 C 300 230, 265 242, 235 255 C 215 264, 198 278, 185 295 C 178 305, 170 308, 162 308',

  ductSideBranches: [
    'M 410 205 L 415 198',
    'M 390 210 L 392 202',
    'M 370 216 L 375 208',
    'M 365 218 L 362 228',
    'M 335 224 L 338 214',
    'M 330 226 L 328 236',
    'M 295 232 L 298 222',
    'M 290 235 L 288 248',
    'M 255 246 L 260 236',
    'M 250 250 L 246 262',
    'M 215 268 L 222 258',
    'M 205 274 L 198 285',
  ],

  // 7. VASCULAR AXIS (Splenic Artery, Splenic Vein, Portal Confluence)
  // Splenic Artery (Tortuous crimson red vessel riding the superior margin)
  splenicArtery:
    'M 245 222 C 265 212, 275 226, 295 214 C 315 202, 328 218, 350 206 C 372 194, 388 210, 410 198 C 425 190, 435 186, 448 182',

  splenicArteryBranches: [
    'M 285 218 L 290 228',
    'M 335 210 L 340 222',
    'M 385 202 L 390 214',
    'M 425 192 L 430 202',
  ],

  // Splenic Vein (Deep royal blue vessel running posterior to body and tail)
  splenicVein:
    'M 445 192 C 420 204, 385 215, 345 225 C 310 234, 280 242, 255 252',

  // Portal Vein & Superior Mesenteric Vein (SMV)
  portalVeinConfluence:
    'M 255 252 C 262 235, 268 210, 275 185 C 285 188, 292 205, 285 230 C 280 248, 274 270, 268 310 C 260 350, 255 370, 248 385 L 238 382 C 245 365, 250 342, 258 305 C 262 278, 260 262, 255 252 Z',

  // Superior Mesenteric Artery (SMA)
  superiorMesentericArtery:
    'M 268 220 C 272 245, 270 280, 262 320 C 256 350, 250 375, 245 388',

  // 8. SPLEEN (Deep maroon organ abutting the tail at upper-right)
  spleenOrgan:
    'M 442 165 C 455 140, 485 132, 505 148 C 522 162, 528 192, 520 215 C 512 238, 492 255, 472 258 C 452 260, 440 248, 436 230 C 432 215, 438 200, 445 190 C 440 182, 438 174, 442 165 Z',

  spleenHilumNotch:
    'M 445 190 C 448 198, 452 205, 458 210',

  spleenGastrosplenicFold:
    'M 465 152 C 485 170, 495 200, 488 235',
};
