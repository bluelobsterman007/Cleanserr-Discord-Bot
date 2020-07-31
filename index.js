const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "%";
const currentVersion = "1.1";
const lastUpdated = "2020-07-30";

var cleanseSpace = [];

for (i = 0; i < 20; i++) {
    cleanseSpace.push("                                                               ");
}

cleanseSpace.push(" ˞˞ ");

var rolesWithAccess = [];

client.on("message", msg=> {
    client.user.setActivity("✨ Actively Cleansing Your Server! Use %help for commands! ✨", {type: "PLAYING"}).catch(console.error);

    let args = msg.content.slice(PREFIX.length).split(" ");

    function userIsAuthorized() {
        for (let i = 0; i < rolesWithAccess.length; i++) {
            if (msg.member.roles.cache.some(v => v.name === rolesWithAccess[i])) {
                var userIsClear = true;
                return true;
            } 
        }
        if(msg.member.hasPermission("MANAGE_GUILD")) {
            var userIsClear = true;
            return true;
        }
        if(!userIsClear) {
            msg.channel.send("You are not authorized to use this command.");
            return false;
        }
    } 
    
    if(msg.content[0] === "%" && userIsAuthorized() === true) {
        switch (args[0]) {
            case "help":
                const helpEmbed = new Discord.MessageEmbed()
                    .setTitle("Help and Support")
                    .setColor("#34e1eb")
                    .addFields(
                        { name: "Bot Prefix", value: "%" },
                        { name: "__Important:__ Please note that any inputs you type in commands are case sensitive.", value: "Thank you ^.^"},
                        { name: "Commands :desktop:", value: "Below is a list of all commands for Cleanserr (that's me!):" },
                        { name : "Cleanse Chat", value: "%cleanse" },
                        { name: "Delete Chat Messages", value: "%delete [# of messages]" },
                        { name: "Add Roles that are Authorized to use this Bot", value: "%addRoles [Role(s)]" },
                        { name: "View list of Current Roles Authorized to use this Bot", value: "%viewRoles"},
                        { name: "Revoke a Role's Acesss to use this Bot", value: "%deleteRoles [Role(s)]"},
                        { name: "Help and Support", value: "%help" },
                        { name: "Bot Information", value: "%info" },
                    )
                msg.channel.send(helpEmbed);
            break;

            case "cleanse":
                for (i = 0; i < 10; i++) {
                    msg.channel.send(cleanseSpace + " ˞˞ ");
            }
            break;

            case "delete":
                msg.channel.bulkDelete(args[1]);
                if (!args[1]) {
                    msg.channel.bulkDelete(1);
                } 
            break;

            case "addRoles":
                if (!args[1]) {
                    return msg.reply("You forgot to give me roles to authorize :upside_down:");
                } else {
                    for (let i = 0; i < args.length-1; i++) {
                        if(rolesWithAccess.includes(args[i+args.length-1])) {
                            msg.channel.send("That role has already been given access.");
                        } else {
                            rolesWithAccess.push(args[i+args.length-1]);
                            msg.channel.send("Role(s) have been successfully added.");
                        }
                    }
                }
            break;
            
            case "viewRoles":
                if(rolesWithAccess.length === 0) {
                    msg.channel.send("There are no specified roles that have been given access."); 
                }
                else { 
                    msg.channel.send(rolesWithAccess);
                }
            break;

            case "deleteRoles":
                if (!args[1]) {
                    return msg.reply("You forgot to give me roles to delete :upside_down:");
                } 
                else {
                    for (let i = 0; i < args.length-1; i++) {
                        if(!rolesWithAccess.includes(args[i+1])) {
                            msg.channel.send("That role does not have currently have access.");
                        } else {
                            rolesWithAccess.splice(rolesWithAccess.indexOf(args[i+1]), 1);
                            msg.channel.send("Role(s) have been successfully deleted.");
                        }
                    }   
                }
            break;

            case "info":
                const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Bot Information")
                .setColor("#34e1eb")
                .addFields(
                    { name: "Current Version", value: currentVersion},
                    { name: "Last Updated", value: lastUpdated },
                    { name: "Created by", value: "two and three#0172"},
                )
                .setFooter("Catch any bugs? Have any new ideas? Feel free to message the developer if you have suggestions for bot improvements.");
                msg.channel.send(infoEmbed);
            break;
        }
    } 
})

client.login(process.env.token);
