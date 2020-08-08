# Open Source - Global Marker Manager for alt:V

Created by Dzeknjak (Jovan Ivanovic)

❤️ Please support my open source work by donating. I'm here to provide general context for complicated procedures for you new developers. ❤️

https://www.buymeacoffee.com/dzeknjak

⭐ This repository if you found it useful!

---

![](https://i.imgur.com/sm8wP7R.png)

# Description

This is a basic global marker manager resource. It allows you to create/destroy markers from the server-side for all players.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

Afterwards, simply add the name of this resource to your `server.cfg` resource section.

`altv-os-global-marker-manager`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/jovanivanovic/altv-os-global-marker-manager
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Example

```javascript
import alt from 'alt-server';

// Create a simple red marker
alt.emit(
    'markers:Create',
    0, // unique identifier
    1, // type of the marker
    new alt.Vector3(0, 0, 72), // position of the marker
    new alt.Vector3(0, 0, 0), // direction of the marker
    new alt.Vector3(0, 0, 0), // rotation of the marker
    new alt.Vector3(1, 1, 1), // scale of the marker
    { // color of the marker
        red: 255, 
        green: 0, 
        blue: 0, 
        alpha: 100 
    } 
);

// Sync all of the created markers with the newly connected player
alt.on('playerConnect', player => {
    alt.emit('markers:Sync', player);
});
```

# Usage

There's couple of events to get you started with this resource:

```javascript
// Notice: these events are serverside only.
```

---

## Creating a marker

```javascript
alt.emit('markers:Create', identifier, type, position, direction, rotation, scale, color);
```

| Argument                            | Description                                                                |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `identifier`                        | Unique identifier for the marker, can be anything as long as it is unique. |
| `type`                              | Type of the marker to show.                                                |
| `position { x, y, z }`              | Location of the marker.                                                    |
| `direction { x, y, z }`             | Direction of the marker.                                                   |
| `rotation { x, y, z }`              | Rotation of the marker.                                                    |
| `scale { x, y, z }`                 | Scale of the marker.                                                       |
| `color { red, green, blue, alpha }` | Color of the marker.                                                       |

For marker types take a look here: [alt:V Wiki - Markers](https://wiki.altv.mp/HUD:Markers)

---

## Deleting a marker

```javascript
alt.emit('markers:Delete', identifier);
```

| Argument     | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `identifier` | Previously set unique identifier of the marker you wish to delete. |

## Changing the draw distance

```javascript
// Notice: default draw distance is set to 150.
```

```javascript
alt.emit('markers:SetDrawDistance', distance);
```

| Argument   | Description                                         |
| ---------- | --------------------------------------------------- |
| `distance` | Sets the draw distance at which the markers appear. |

## Syncing the markers with a player

```javascript
// Notice: you should probably call this event on player connect.
```

---

```javascript
alt.emit('markers:Sync', player);
```

| Argument | Description                                      |
| -------- | ------------------------------------------------ |
| `player` | Player handle you wish to sync the markers with. |

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Nametags by Stuyk](https://github.com/Stuyk/altv-os-nametags)
-   [Missing Interiors by Dzeknjak](https://github.com/jovanivanovic/altv-os-missing-interiors)
