/// <reference types="@altv/types-client" />
import alt from 'alt-client';

/**
 * Returns the distance between vectors
 *
 * @param {alt.Vector3} vector Second vector
 */
alt.Vector3.prototype.distance = function distance(vector) {
    return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2) + Math.pow(this.z - vector.z, 2));
};
