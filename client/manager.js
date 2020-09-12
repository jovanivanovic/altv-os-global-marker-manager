/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import natives from 'natives';

const player = alt.Player.local;
const markers = {};
let markersDrawDistance = 150;
let markersInterval = undefined;

alt.onServer('markers:Create', markersCreate);
alt.onServer('markers:Delete', markersDelete);
alt.onServer('markers:SetDrawDistance', markersSetDrawDistance);
/**
 * Creates a new global marker
 *
 * @param {{ identifier: any, type: number, position: alt.Vector3, direction: alt.Vector3, rotation: alt.Vector3, scale: alt.Vector3, color: { red: number, green: number, blue: number, alpha: number }}} blip
 */
function markersCreate(marker) {
    markers[marker.identifier] = marker;

    if (!markersInterval) {
        markersInterval = alt.setInterval(drawMarkers, 0);
    }
}

/**
 * Deletes a blip
 *
 * @param {any} identifier
 */
function markersDelete(identifier) {
    const marker = markers[identifier];
    if (!marker) return;
    delete markers[identifier];

    if (markers.length < 1 && markersInterval) {
        alt.clearInterval(markersInterval);
        markersInterval = undefined;
    }
}

/**
 * Sets the draw distance at which the markers appear
 *
 * @param {number} distance
 */
function markersSetDrawDistance(distance) {
    markersDrawDistance = distance;
}

/**
 * Draw markers on the screen
 */
function drawMarkers() {
    for (const markerId in markers) {
        const marker = markers[markerId];
        if (!marker) continue;
        if (player.pos.distance(marker.position) > markersDrawDistance) continue;

        natives.drawMarker(
            marker.type,
            marker.position.x,
            marker.position.y,
            marker.position.z,
            marker.direction.x,
            marker.direction.y,
            marker.direction.z,
            marker.rotation.x,
            marker.rotation.y,
            marker.rotation.z,
            marker.scale.x,
            marker.scale.y,
            marker.scale.z,
            marker.color.red,
            marker.color.green,
            marker.color.blue,
            marker.color.alpha,
            false,
            true,
            2,
            false,
            undefined,
            undefined,
            false
        );
    }
}
