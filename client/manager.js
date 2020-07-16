/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import natives from 'natives';

const player = alt.Player.local;
const markers = [];
const markersDrawDistance = 150;
let markersInterval = undefined;

alt.onServer('markers:Create', markersCreate);
alt.onServer('markers:Delete', markersDelete);

/**
 * Creates a new global marker
 *
 * @param {{ identifier: any, type: number, position: alt.Vector3, direction: alt.Vector3, rotation: alt.Vector3, scale: alt.Vector3, color: { red: number, green: number, blue: number, alpha: number }}} blip
 */
function markersCreate(marker) {
    markers.push(marker);

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
    const markerIndex = markers.findIndex(marker => marker.identifier == identifier);
    if (markerIndex === -1) return;
    markers.splice(markerIndex, 1);

    if (markers.length < 1 && markersInterval) {
        alt.clearInterval(markersInterval);
        markersInterval = undefined;
    }
}

/**
 * Draw markers on the screen
 */
function drawMarkers() {
    const closeMarkers = markers.filter(marker => player.pos.distance(marker.position) < markersDrawDistance);

    for (const marker of closeMarkers) {
        if (!marker) continue;

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
