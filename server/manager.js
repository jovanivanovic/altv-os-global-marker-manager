/// <reference types="@altv/types-server" />
import alt from 'alt-server';

const markers = [];

alt.on('markers:Create', markersCreate);
alt.on('markers:Delete', markersDelete);
alt.on('markers:SetDrawDistance', markersSetDrawDistance);
alt.on('markers:Sync', markersSync);

/**
 * Creates a new global marker
 *
 * @param {any} identifier
 * @param {number} type
 * @param {alt.Vector3} position
 * @param {alt.Vector3} direction
 * @param {alt.Vector3} rotation
 * @param {alt.Vector3} scale
 * @param {{ red: number, green: number, blue: number, alpha: number }} color
 */
function markersCreate(identifier, type, position, direction, rotation, scale, color) {
    if (markers.findIndex(marker => marker.identifier == identifier) !== -1) {
        throw new Error(`Marker identifier [${identifier}] is already in use.`);
    }

    const marker = { identifier, type, position, direction, rotation, scale, color };
    markers.push(marker);

    alt.emitClient(null, 'marker:Create', marker);
}

/**
 * Deletes a marker
 *
 * @param {any} identifier
 */
function markersDelete(identifier) {
    const markerIndex = markers.findIndex(marker => marker.identifier == identifier);
    if (markerIndex === -1) return;

    markers.splice(markerIndex, 1);
    alt.emitClient(null, 'markers:Delete', identifier);
}

/**
 * Sets the draw distance at which the markers appear
 *
 * @param {number} distance
 */
function markersSetDrawDistance(distance) {
    alt.emitClient(null, 'markers:SetDrawDistance', distance);
}

/**
 * Syncs all the markers with a specific player
 *
 * @param {alt.Player} player
 */
function markersSync(player) {
    for (const marker of markers) {
        alt.emitClient(player, 'markers:Create', marker);
    }
}
