# Centerline Detection Implementation

## Problem Statement
The previous version of the wood pattern detection was generating scattered polylines that didn't follow the center of carved patterns. This was different from JDPaint software, which generates clean centerlines through the middle of each carving.

## Solution Implemented
Implemented a **skeleton/medial axis extraction algorithm** using the Zhang-Suen thinning method to generate centerlines that run through the exact center of carved patterns.

## Key Algorithms Added

### 1. **Binary Map Creation** (`createBinaryMap`)
- Converts the grayscale image into a binary map
- Marks carved areas (darker regions) as 1, background as 0

### 2. **Morphological Operations**
- **Dilation** (`morphologicalDilate`): Expands carved regions to fill small gaps
- **Erosion** (`morphologicalErode`): Shrinks regions back to original size
- **Closing** (`morphologicalClose`): Combines dilation + erosion to clean up noise

### 3. **Skeleton Extraction** (`extractSkeleton`)
- Implements the **Zhang-Suen thinning algorithm**
- Iteratively removes pixels from the edges while preserving connectivity
- Results in a 1-pixel-wide skeleton running through the center of each pattern
- Maximum 100 iterations to ensure convergence

### 4. **Polyline Tracing** (`tracePolyline`)
- Traces connected skeleton pixels to form continuous polylines
- Uses 8-connected neighbor detection
- Ensures each carved pattern gets a single, clean centerline

### 5. **Polyline Smoothing** (`smoothPolyline`)
- Orders points to form continuous lines
- Applies 3-point averaging to smooth the centerline
- Removes jagged edges while maintaining the path through the center

## Technical Details

### Zhang-Suen Algorithm
The algorithm checks four conditions for each pixel:
1. **Condition A**: Number of non-zero neighbors must be between 2 and 6
2. **Condition B**: Exactly one 0-to-1 transition in the 8-neighbor sequence
3. **Condition C & D**: Specific neighbor patterns to preserve connectivity

### Benefits
✅ **Accurate centerlines**: Polylines run through the exact middle of carvings
✅ **Single line per carving**: Each carved pattern gets one clean polyline
✅ **Smooth paths**: Centerlines are smoothed for better CNC toolpath generation
✅ **Consistent with JDPaint**: Matches the behavior of professional CNC software

## Files Modified
- `wood_pattern_detection.html`: Added 300+ lines of centerline detection algorithms

## How It Works
1. User uploads a wood carving image
2. System detects carved areas (darker regions)
3. Morphological operations clean up the binary image
4. Zhang-Suen algorithm extracts the skeleton (centerline)
5. Skeleton pixels are traced into smooth polylines
6. Polylines are displayed on the canvas

## Usage
1. Open `wood_pattern_detection.html`
2. Upload a wood carving image
3. Adjust sensitivity and detail level
4. Click "Detect Wood Patterns"
5. Polylines will now follow the center of each carved pattern

## Comparison with Previous Version
- **Before**: Scattered edge points grouped into messy polylines
- **After**: Clean centerlines through the middle of each carving, just like JDPaint

---
**Implementation Date**: October 17, 2025
**Algorithm**: Zhang-Suen Thinning + Morphological Operations
**Language**: JavaScript
