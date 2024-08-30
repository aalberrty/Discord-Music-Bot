const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("previous").setDescription("Plays previous song."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            await queue.previous();

            const skippedEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setDescription("Skipping to the previus song.")
                .setFooter({
                    text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            return await interaction.editReply({ embeds: [skippedEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Commanded by ${interaction.user.globalName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            return await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
