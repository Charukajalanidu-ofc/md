const { cmd } = require('../command'); // Import cmd from the command module
const config = require('../config'); // Import config

// Define your commands object
const commands = {
  "define": {
    category: "search",
    desc: "Search From Dictionary"
  },
  "trt": {
    category: "main",
    desc: "Displays trending topics."
  },
  "joke": {
    category: "fun",
    desc: "Tells a random joke."
  },
  "alive": {
    category: "main",
    desc: "Shows if the bot is online."
  },
  "system": {
    category: "main",
    desc: "Displays system information."
  },
  "song": {
    category: "fun",
    desc: "Plays a random song."
  },
  "video": {
    category: "media",
    desc: "Sends a random video."
  },
  "weather": {
    category: "useful",
    desc: "Fetches weather information."
  },
  "ping": {
    category: "main",
    desc: "Pings the bot and shows response time."
  },
  "fact": {
    category: "fun",
    desc: "Gives a random fact."
  },
  "hack": {
    category: "fun",
    desc: "Hacking Your Device"
  },
  "movie": {
    category: "search",
    desc: "Get movie info"
  },
  "animegirl": {
    category: "fun",
    desc: "Get anime girl photos"
  },
  "wallpaper": {
    category: "fun",
    desc: "Get random wallpapers"
  },
  "githubstalk": {
    category: "search",
    desc: "Get GitHub profile info"
  },
  "dog": {
    category: "fun",
    desc: "Get random dog pictures"
  },
  "ai": {
    category: "search",
    desc: "Chat with AI"
  },
  "setautobio": {
    category: "owner",
    desc: "Set auto bio"
  },
  "converter": {
    category: "converter",
    desc: "Convert currency to currency"
  },
  "join": {
    category: "owner",
    desc: "Join group using invite link"
  },
  "srepo": {
    category: "search",
    desc: "Search repo details"
  },
  "gpass": {
    category: "useful",
    desc: "Generate strong password"
  },
  "rvideo": {
    category: "fun",
    desc: "Get random video"
  },
  "restart": {
    category: "owner",
    desc: "Restarts the bot."
  }
};

// Define the command using cmd
cmd({
  pattern: "list",
  desc: "Display all available commands in a beautiful format.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Group commands by category
    const groupedCommands = {};
    Object.keys(commands).forEach(cmd => {
      const category = commands[cmd].category || "Uncategorized";
      if (!groupedCommands[category]) {
        groupedCommands[category] = [];
      }
      groupedCommands[category].push(cmd);
    });

    // Emoji mapping for categories
    const categoryEmojis = {
      "main": "🌟",
      "group": "👥",
      "owner": "👑",
      "useful": "🛠️",
      "download": "📥",
      "search": "🔍",
      "fun": "🎮",
      "converter": "🔄",
      "media": "🎥",
      "Uncategorized": "📁"
    };

    // Create the menu message
    let menuMessage = `╔ ≪°👾*BHASHI-MD MENU*👾°≫ ╗\n\n`;
    menuMessage += `👋 Hello!\n`;
    menuMessage += `🤖 I'm BHASHI-MD, your friendly bot assistant.\n\n`;
    menuMessage += `📚 Here are my available commands:\n\n`;

    for (const category in groupedCommands) {
      const emoji = categoryEmojis[category] || "📁";
      menuMessage += `┌─⊷ *${emoji} ${category.toUpperCase()}*\n`;
      groupedCommands[category].forEach(cmd => {
        const desc = commands[cmd].desc ? ` - ${commands[cmd].desc}` : '';
        menuMessage += `│ • *${config.PREFIX}${cmd}*${desc}\n`;
      });
      menuMessage += `└───────────\n\n`;
    }

    menuMessage += `🔧 Use ${config.PREFIX}help <command> for detailed info on a specific command.\n\n`;
    menuMessage += `╚═ ≪ °*ᴘᴏᴡᴇʀᴇᴅ ʙʜᴀsʜɪ-ᴍᴅ*° ≫ ═╝`;

    // Send the menu message
    const sentMessage = await conn.sendMessage(from, { 
      text: menuMessage,
      contextInfo: {
        externalAdReply: {
          title: "BHASHI-MD MENU",
          body: "Your Ultimate Bot Assistant",
          sourceUrl: "https://github.com/vishwamihi/BHASHI-MD-PAIR-CODE"
        }
      }
    }, { quoted: mek });

    // Add a reaction to the sent message
    await conn.sendMessage(from, {
      react: {
        text: "📁", // Reaction emoji
        key: sentMessage.key
      }
    });

  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e.message}`);
  }
});

module.exports = { commands }; // Export the commands object if needed elsewhere

