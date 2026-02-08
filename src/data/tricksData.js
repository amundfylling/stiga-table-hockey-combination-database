/**
 * OpenTricks - Hockey/Floorball Tricks Database
 * 
 * How to contribute:
 * 1. Fork this repository on GitHub
 * 2. Add your trick to this file following the format below
 * 3. Submit a Pull Request
 * 
 * Trick Object Structure:
 * {
 *   id: number (unique identifier)
 *   name: string (trick name)
 *   description: string (detailed explanation)
 *   difficulty: number (1-10, where 10 is hardest)
 *   position: string ("Center" | "Winger" | "Defense" | "Goalie")
 *   mediaUrl: string (URL to image or GIF)
 *   contributor: string (optional - your name/handle)
 * }
 */

export const tricksData = [
    {
        id: 1,
        name: "The Zorro",
        description: "A deceptive stick-handling move where you drag the puck quickly from one side to the other behind your back foot, creating a 'Z' pattern. Perfect for evading a defender in tight spaces. Start by pulling the puck to your forehand, then quickly sweep it behind your back leg to your backhand side.",
        difficulty: 7,
        position: "Winger",
        mediaUrl: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=600&h=400&fit=crop",
        contributor: "IceKing99"
    },
    {
        id: 2,
        name: "Goalie Freeze",
        description: "A technique where the goalie quickly covers the puck with their glove or body to stop play and give your team a breather. Essential during penalty kills or when your team is under heavy pressure. Timing is crucial - freeze too early and you give up offensive opportunities, too late and you risk a rebound.",
        difficulty: 3,
        position: "Goalie",
        mediaUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop",
        contributor: "NetMinder42"
    },
    {
        id: 3,
        name: "Michigan (Lacrosse Goal)",
        description: "The legendary move where you scoop the puck onto your blade and tuck it into the top corner from behind the net. Made famous by Mike Legg in 1996. Requires exceptional hand-eye coordination and blade control. Best attempted when the goalie is deep in the crease and not expecting it.",
        difficulty: 10,
        position: "Center",
        mediaUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        contributor: "DangleKing"
    },
    {
        id: 4,
        name: "Hip Check",
        description: "A classic defensive body check where you lower your body and use your hip to knock an opposing player off the puck. Timing and positioning are everything - hit too early and you'll miss, too late and you'll take a penalty. Keep your feet moving and drive through the check with your legs.",
        difficulty: 5,
        position: "Defense",
        mediaUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
        contributor: "BlueLiner88"
    },
    {
        id: 5,
        name: "One-Timer",
        description: "Receiving a pass and shooting immediately without stopping the puck. The key is reading the pass early, getting your body in position, and timing your swing to connect cleanly. A deadly weapon on the power play when executed from the circle. Practice your timing with a partner passing from various angles.",
        difficulty: 6,
        position: "Winger",
        mediaUrl: "https://images.unsplash.com/photo-1580748142722-4c9fdeda1dd0?w=600&h=400&fit=crop",
        contributor: null
    }
];

export default tricksData;
