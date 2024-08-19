const { Client, GatewayIntentBits, Partials, EmbedBuilder, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions],
partials: [Partials.Message, Partials.Channel, Partials.Reaction]});
const { Permissions } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, InteractionType, ChannelType, PermissionsBitField , ButtonBuilder, ButtonStyle, AuditLogEvent, AttachmentBuilder, SlashCommandBuilder  } = require('discord.js');
const moment = require('moment')
const ms = require('ms')
const db = require('quick.db')
const puppeteer = require('puppeteer')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10');
const info = require('./info.json')
const prefix = '!'
const axios = require('axios')
const ip = `Soon` //Bazeis thn ip tou server (gia to !status kai to connect)
client.on('ready', () => {
    console.log('Bot Is Up!')
    client.user.setStatus('dnd')
    client.user.setActivity('Verse Roleplay') // Edw bazeis sto status poy thes na exei to bot soy



    setInterval(async() => {
      
      const guild = client.guilds.cache.get('1053619043694825533') // Bazeis to guild Id
      if (guild) {
        const channel = client.channels.cache.get('1266320601359056937') //Bazeis to channel id tou auto connect | PROSOXH TO CHANNEL AYTO THA PREPEI NA MHN XEI KANENA ALLO MSG EKTOS APO AYTO POY THA STEILEI TO BOT AYTOAMTA
        if (channel) {
          const messages = await channel.messages.fetch()
          const firstMessage = messages.first()
  
          
          
  
          if (firstMessage) {
              try {

                

                  const { data } = await axios.get(`http://${ip}/dynamic.json`);
                  const regex = /\[([0-9]+)\]/;
                  const queue = data.hostname.match(regex);
                  if (queue) {
                    const embed = new EmbedBuilder()
                    .setAuthor({name: guild.name, iconURL: uild.iconURL({dynamic: true })})
                    .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                    .setColor('#40f58e')
                    .addFields(
                      {name: "**Server Status**", value: "**<a:online:1272085401741430888>    Online**", inline:true},
                      {name: "**Players**", value: `**${data.clients}/${data.sv_maxclients}**`, inline: true},
                        {name: "**Queue**", value: `**${queue[1]}**`, inline: true}
                    )
                    .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                    return firstMessage.edit({embeds: [embed]}).then(async () => {
                      console.log('Refresh')
                    })
                  } else {
                    const embed = new EmbedBuilder()
                    .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                    .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                    .setColor('#40f58e')
                    .addFields(
                      {name: "**Server Status**", value: "**<a:online:1272085401741430888>    Online**", inline:true},
                      {name: "**Players**", value: `**${data.clients}/${data.sv_maxclients}**`, inline: true},
                        {name: "**Queue**", value: `**0**`, inline: true}
                    )
                    .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                    return firstMessage.edit({embeds: [embed]}).then(async () => {
                      console.log('Refresh')
                    })
                    console.log('AXAXAX')
                  }
                } catch (e) {
                  console.log(e)
                  const embed = new EmbedBuilder()
                  .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                  .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                  .setColor('#ff0000')
                  .addFields(
                    {name: "**Server Status**", value: "**<a:offline:1272085724761423937>     Offline**", inline:true},
                    {name: "**Players**", value: `**Offline**`, inline: true},
                      {name: "**Queue**", value: `**Offline**`, inline: true}
                  )
                  .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                
                  return firstMessage.edit({embeds: [embed]}).then(async () => {
                    console.log('Refresh')
                  })
                }
          } else {
            const embed = new EmbedBuilder()
                  .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                  .setDescription(`**Για να συνδεθείτε στον server μας πατήστε \`F8\` και γράψτε \`connect ${ip}\`**`)
                  .setColor('#ff0000')
                  .addFields(
                    {name: "**Server Status**", value: "**<a:offline:1272085724761423937>     Offline**", inline:true},
                    {name: "**Players**", value: `**Offline**`, inline: true},
                      {name: "**Queue**", value: `**Offline**`, inline: true}
                  )
                  .setFooter({text: `Ενημερώθηκε στις ${new Date().getHours()}:${new Date().getMinutes()}`})
                  channel.send({embeds: [embed]})
          }
        }
      }
  
  }, 60000);


  

})
    
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

tracker.on('guildMemberAdd', (member, type, invite) => {



  if(type === 'normal'){
      let hmeres = ms('5 days')
      let createdAt = new Date(member.user.createdAt).getTime()
      let diff = Date.now() - createdAt
      let diarkeia = ''
      if(diff === 0) diarkeia = 'λίγων ωρών/λεπτών'
      if(diff === 1) diarkeia = '1 ημέρας'
      if(diff > 2) diarkeia = `${diff} ημερών`
      if(diff === 2) diarkeia = `2 ημερών`


      if(hmeres > diff) {
        
          if(db.get(`inviter_${member.id}`) === invite.inviter.id){
              db.add(`invites_${member.guild.id}_leave_${invite.inviter.id}`, -1)
              db.add(`invites_${member.guild.id}_fake_${invite.inviter.id}`, 1)
              db.set(`inviter_${member.id}`, invite.inviter.id)
              db.set(`joinbyinviter_${member.id}`, `yes`)
              db.set(`faker_${member.id}`, `yes`)
              console.log('1')
          }

          else{
              db.add(`invites_${member.guild.id}_fake_${invite.inviter.id}`, 1)
              db.add(`invites_${member.guild.id}_all_${invite.inviter.id}`, 1)
              db.set(`inviter_${member.id}`, invite.inviter.id)
              db.set(`joinbyinviter_${member.id}`, `yes`)
              db.set(`faker_${member.id}`, `yes`)
              console.log('2')
          }
     
  }else{
   
     if(db.get(`inviter_${member.id}`) === invite.inviter.id){
      db.add(`invites_${member.guild.id}_leave_${invite.inviter.id}`, -1)
      db.add(`invites_${member.guild.id}_real_${invite.inviter.id}`, 1)
      db.set(`inviter_${member.id}`, invite.inviter.id)
      db.set(`joinbyinviter_${member.id}`, `yes`)
      db.set(`faker_${member.id}`, `no`)
      console.log('3')
     }else{
      
      db.add(`invites_${member.guild.id}_real_${invite.inviter.id}`, 1)
      db.add(`invites_${member.guild.id}_all_${invite.inviter.id}`, 1)
      db.set(`inviter_${member.id}`, invite.inviter.id)
      db.set(`joinbyinviter_${member.id}`, `yes`)
      db.set(`faker_${member.id}`, `no`)
      console.log('4')
      }

  }
  }
  else if(type === 'vanity'){
   console.log('server')
  }

  else if(type === 'permissions'){
   console.log('problem')
  }

  else if(type === 'unknown'){
    console.log('error')
  }

});


client.on('guildMemberAdd',async member => {
 

    let createdAt = new Date(member.user.createdAt).getTime()
    const createdate = moment.utc(member.user.createdAt).format("DD/MM/YYYY")
    const createdate1 = moment.utc(member.user.createdAt).format("MM/DD/YYYY")
    const t = parseInt((new Date(`${createdate1}`).getTime() / 1000).toFixed(0)) 
    const xr = `<t:${t}:R>`
    const embed = new EmbedBuilder()
    .setColor('#40f58e')
    .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })

   .setDescription(`> \`Name:\` ${member.user.username}\n\n> \`Mention:\` <@${member.user.id}>\n\n> \`Δημιουργία λογαριασμού:\` ${xr}`)
   client.channels.cache.get("1053619044235890708").send({embeds: [embed]}) // Member Logs Channel Id
    member.roles.add('1053619043694825539') //Auto role id
})

client.on('guildMemberRemove', async member => {
    try{
    let createdAt = new Date(member.user.createdAt).getTime()
    const createdate = moment.utc(member.user.createdAt).format("DD/MM/YYYY")
    const createdate1 = moment.utc(member.user.createdAt).format("MM/DD/YYYY")
    const t = parseInt((new Date(`${createdate1}`).getTime() / 1000).toFixed(0)) 
    const xr = `<t:${t}:R>`

   const embed = new EmbedBuilder()
   .setColor('#ff0000')
   .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })

  .setDescription(`> \`Name:\` ${member.user.username}\n\n> \`Mention:\` <@${member.user.id}>\n\n> \`Δημιουργία λογαριασμού:\` ${xr}`)


  client.channels.cache.get("1053619044235890708").send({embeds: [embed]}) // Member Logs Channel Id

    }catch(e){
        console.log(e.message)
    }
 })

 client.on('voiceStateUpdate', (oldMember, newMember, newState) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    
    if (oldUserChannel === null) { 
      try {
      const embed = new EmbedBuilder()
     .setAuthor({name: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true })})
      .setDescription(`> \`Χρήστης:\` ${newMember.member}\n\n> \`Μπήκε στο:\` ${newUserChannel} • \`${newUserChannel.name}\``)
      .setColor('#40f58e')
      newUserChannel.guild.channels.cache.get('1053619044235890710').send({embeds: [embed]}) // Voice logs channel id
      } catch(e) {
      
      }
    } else if (newUserChannel === null) { 
      try {
      let color = oldMember.member.displayHexColor;
        if (color == '#36393F') color = oldMember.member.hoistRole.hexColor
      
      const embed2 = new EmbedBuilder()
      .setAuthor({ name: oldMember.guild.name, iconURL: oldMember.guild.iconURL( { dynamic: true })})
      .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Βγήκε από το:\` ${oldUserChannel} • \`${oldUserChannel.name}\``)
      .setColor('#ff0000')
      if(oldUserChannel.id === '1053619044235890710' || oldUserChannel.id === '1053619044235890710') return;
      oldUserChannel.guild.channels.cache.get('1053619044235890710').send({embeds: [embed2]}) // voice logs channel id
      } catch(e) {
        
      }
    } 
    });			


    client.on('messageDelete', async message => {
        try{
          if (!message.guild) return;
        
          const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
          });
          
          const deletionLog = fetchedLogs.entries.first();
        
          
          if (!deletionLog) return 
        
          const { executor, target} = deletionLog;
        if(message.member.user.bot) return;
          if (target.id === message.author.id) {
            const embed = new EmbedBuilder()
           .setColor('#ff0000')
           .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dyanamic: true })})
           .setDescription(`> \`Μήνυμα:\` ${message}\n\n> \`Μήνυμα από:\` ${message.author}\n\n> \`Διαγράφτηκε από:\` ${executor}\n\n> \`Κανάλι:\` ${message.channel}`)
          if(message.member.roles.cache.has('1053619043694825537')) return; //Bot Role Id

           const discordlogs = message.guild.channels.cache.get('1053619044235890716'); // Chat Logs Id
        
           discordlogs.send({embeds: [embed]})  
          } else {
            const embed = new EmbedBuilder()
           .setColor('#ff0000')
           .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dyanamic: true })})
           .setDescription(`> \`Μήνυμα:\` ${message}\n\n> \`Μήνυμα από:\` ${message.author}\n\n> \`Διαγράφτηκε από:\` ${message.author}\n\n> \`Κανάλι:\` ${message.channel}`)
           if(message.member.roles.cache.has('1053619043694825537')) return; // Bot Role Id
          
           const discordlogs = message.guild.channels.cache.get('1053619044235890716'); // Chat Logs Id
        
           discordlogs.send({embeds: [embed]})  
          
          } 
      }catch(e){
          console.log(e.message)
      }
        });
        client.on('messageUpdate', (oldMessage, newMessage) => { 
            try{
          if(!newMessage.author) return;
          if(newMessage.author.bot) return;
         if(oldMessage.author.bot) return;
        const embed = new EmbedBuilder()
        .setAuthor({ name: oldMessage.guild.name, iconURL: oldMessage.guild.iconURL({ dynamic: true })})
        .setColor('#40f58e')
        .setDescription(`> \`Μήνυμα από:\` ${newMessage.author}\n\n> \`Κανάλι:\` ${newMessage.channel}\n\n> \`Παλιό μήνυμα:\` \`\`\`${oldMessage}\`\`\`\n\n> [\`Νέο μήνυμα:\`](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}) \`\`\`${newMessage}\`\`\``)
        newMessage.guild.channels.cache.get('1053619044235890716').send({embeds: [embed]}) //Chat Logs Id
            }catch(e){
                console.log(e.message)
            }
        })
        client.on('guildMemberUpdate', async (oldMember, newMember) => {
            try{
                if (newMember.roles.cache.size > oldMember.roles.cache.size) {
                    let entry = await oldMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(audit => audit.entries.first());
                    let logUser = entry.executor.id;
                    let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);
              
              
                    const roleRemovedEmbed = new EmbedBuilder()
                    .setColor('#40f58e')
                    .setAuthor({ name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dynamic: true })})
                    
                        newMember.roles.cache.forEach(role => {
                        if (!oldMember.roles.cache.has(role.id)) {
                          roleRemovedEmbed.setDescription(`> \`Χρήστης:\` <@${oldMember.user.id}>\n\n> \`Πήρε τον ρόλο:\` ${role}\n\n> \`Από τον/την:\` <@${logUser}>`)
              
                        }
                    });
              
                    const discordlogs = newMember.guild.channels.cache.get('1053619044235890711'); //Role Channel Id
                    discordlogs.send({embeds: [roleRemovedEmbed]})
                  }
                if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                    let entry = await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate}).then(audit => audit.entries.first());
                    let logUser = entry.executor.id;
                    let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);
              
              
                    const roleRemovedEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setAuthor({name: newMember.guild.name, iconURL: newMember.guild.iconURL({ dynamic: true })})
                    
                    oldMember.roles.cache.forEach(role => {
                        if (!newMember.roles.cache.has(role.id)) {
              
                          roleRemovedEmbed.setDescription(`> \`Χρήστης:\` <@${newMember.user.id}>\n\n> \`Αφαιρέθηκε ο ρόλος:\` ${role}\n\n> \`Από τον/την:\` <@${logUser}>`)
              
                        }
                    });
              
                    const discordlogs = oldMember.guild.channels.cache.get('1053619044235890711'); //Role Channel Id
              
                    discordlogs.send({embeds: [roleRemovedEmbed]})
                }
            }catch(e){
                console.log(e.message)
            }
              });

              client.on('guildBanAdd', async (ban) => {
     
                const fetchedLogs = await ban.guild.fetchAuditLogs({
                  limit: 1,
                  type: AuditLogEvent.MemberBanAdd,
                });
              
              
              
                const createdate = moment.utc(ban.user.createdAt).format("DD/MM/YY")
                const banLog = fetchedLogs.entries.first();
              
              
                if (!banLog) return;
             
                const { executor, target, reason } = banLog;
                  if(executor.bot) return;
               
                if (target.id === ban.user.id) {
                  console.log(reason)
                const embed = new EmbedBuilder()
                .setAuthor({name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true})})
                 .setColor('#ff0000')
                 if(reason) {
                   embed.setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Αιτία:\` ${reason}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                   console.log('RR1')
                 } else if(!reason) {
                   embed.setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                   console.log('RR')
                 }
                 client.channels.cache.get("1053619044235890712").send({embeds: [embed] }) //Ban Logs CHannel Id
                } else {
                   
                }
              });
              
              client.on('guildBanRemove', async (ban) => {
               
                const fetchedLogs = await ban.guild.fetchAuditLogs({
                  limit: 1,
                  type: AuditLogEvent.MemberBanRemove,
                });
              
              
                const createdate = moment.utc(ban.user.createdAt).format("DD/MM/YY")
                const banLog = fetchedLogs.entries.first();
              
               
                if (!banLog) return;
              
                const { executor, target } = banLog;
              
             
                if (target.id === ban.user.id) {
                
                const embed = new EmbedBuilder()
                .setAuthor({name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true})})
                 .setColor('#40f58e')
                
                  .setDescription(`> \`Χρήστης:\` ${ban.user}\n\n> \`Από τον/την:\` ${executor}\n\n> \`Δημιουργία λογαριασμού:\` ${createdate}`)
                
                
                 client.channels.cache.get("1053619044235890712").send({embeds: [embed] }) //Ban Logs Channel Id
                } else {
                   
                }
              });



              const inviteLogsChannelId = '1053619044235890715';

              client.on('inviteCreate', async invite => {
                  try {
                      const channel = await invite.guild.channels.cache.get(inviteLogsChannelId);
              
                      if (!channel) {
                          console.error(`Channel with ID ${inviteLogsChannelId} not found`);
                          return;
                      }
              
                      const embed = new EmbedBuilder()
                          .setDescription(`**Action: ✉️ Invite Created\nMention: ${invite.inviter}**`)
                          .addFields(
                              { name: `🔗 Channel`, value: `||${invite.channel}||`, inline: true },
                              { name: `🆔 Invite Code`, value: `\`\`discord.gg/${invite.code}\`\``, inline: true }
                          )
                          .setFooter({ text: 'Invite Logs' })
                          .setColor('#252dc2');
              
                      await channel.send({ embeds: [embed] });
                  } catch (error) {
                      console.error('Error sending invite log:', error);
                  }
              });
     
              
              client.on('messageCreate', message => {
                if(message.author.bot) return;
                  if (!message.guild) return;
                  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator) ||message.channel.name.includes('ticket')) return;
                  
                  if(message.channel.name.includes("ticket-")) return;
                  if(message.content.includes('https://') || message.content.includes('http://')) {
                    message.delete()
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                    .setColor('#252dc2')
                    .setDescription(`> \`Χρήστης:\` ${message.author}\n\n> \`Μήνυμα:\` ${message.content}`)
                    client.channels.cache.get("1053619044462370857").send({embeds: [embed]}) //Anti Link Logs Id
                    if(message.content.includes('discord.gg') || message.content.includes('dsc.gg')){
                      message.member.timeout(1 * 3600000, `Anti Link`)
                    }
                  }
                })
                client.on('messageCreate', async message => {
                  if( message.content === '!apps' || message.content === '!APP' || message.content === '!app' || message.content === '!applications' || message.content === '!APPLICATIONS' || message.content === '!application' || message.content === '!APPLICATION'){
                    const embed = new EmbedBuilder()
                    .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                    .setColor('#252dc2')
                    .setDescription("**Παρακάτω θα βρείτε τις αιτήσεις, όπου μπορείτε να ενταχθείτε σε ένα άπο τα σώματα του Visual Remastered ώστε να βοηθήσετε εκεί που επιθυμείτε!**")
                    const row = new ActionRowBuilder()
                    .addComponents(
                  new ButtonBuilder()
                   .setStyle(ButtonStyle.Link)
                   .setEmoji(`<:emoji_70:1271469778153766953>`)
                   .setLabel('Staff™')
                   .setURL('https://docs.google.com/forms/d/e/1FAIpQLSc4z4nyTF_qwOaCmrzTa9o5EzbHmLSvpMT5Zfh64ulkCP3gcw/viewform'),
                   
                   new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setEmoji(`<:elas:1230580999344230400>`)
                  .setLabel('ΕΛ.ΑΣ')
                  .setDisabled(true)
                  .setURL('https://docs.google.com/forms/d/e/1FAIpQLSeN59B6TECkw8NekT2hF1QddM4thcby9RJNFu3WMQ6v592hAw/viewform'),
                 
                  new ButtonBuilder()
                 .setStyle(ButtonStyle.Link)
                   .setEmoji(`<:ekav:1230581027139883178>`)
                   .setLabel('Ε.Κ.Α.Β')
                   .setDisabled(true)
                   .setURL('https://docs.google.com/forms/d/e/1FAIpQLSfK_jNBlRWAbJ2ImTOzBnEAYiV58DDH4MPwcmMJyzNly3n2jg/viewform?pli=1'),
            
                  );
               message.channel.send({ embeds: [embed], components: [row]})


                  }
                 })

              
              
                 client.on('guildMemberUpdate', (oldMember, newMember) => {
                  if (oldMember.nickname !== newMember.nickname) {
                      const logChannelId = '1053619044235890715'; // Replace with your actual log channel ID
                      const logChannel = client.channels.cache.get(logChannelId);

                      if (logChannel) {
                          // Fetch the current guild member to get the correct old nickname
                          newMember.guild.members.fetch(newMember.user.id)
                              .then(member => {
                                  const oldNickname = oldMember.nickname || 'None';
                                  const newNickname = newMember.nickname || 'None';
              
                                  const embed = new EmbedBuilder()
                                      .setColor('#ff0000') // You can set a custom color for the embed
                                      .setTitle('Nickname Change')
                                      .setDescription(`User ${newMember.user.tag} (${newMember.user.id}) changed nickname in ${newMember.guild.name}.`)
                                      .addFields(
                                          { name: 'Before', value: oldNickname, inline: true },
                                          { name: 'After', value: newNickname, inline: true }
                                      )
                                      .setTimestamp();
              
                                  logChannel.send({ embeds: [embed] });
                              })
                              .catch(err => {
                                  console.error('Error fetching member:', err);
                              });
                      } else {
                          console.error('Log channel not found.');
                      }
                  }
              });
                
                

                 const logsappAllowlist = '1272653698450853999';
                 const Allowlist = {
                   prwti: "Ηλικία (IRL):",
                   defterh: "Steam Url:",
                   trith: "Ποιο θα είναι το Rp σας στον Server:",
                   tetarth: "Αν σας σταματήσει ένας αστυνομικός για τυπικό έλεγχο τι θα κάνετε:",
                   pemth: "Σε ποιους Servers έχετε ξανά παίξει:",
                   ekth: "Συμφωνείτε με τα Rules, αν όχι τι θα θέλατε να αλλάξετε",
                 };
                 
                 client.on('messageCreate', async message => {
                   if (message.content === '!1') {
                     if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                       try {
                         const embed = new EmbedBuilder()
                           .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                           .setDescription("**Ολες οι αιτήσεις για τα Allowlist παρακαλούμε να απαντηθούν με ελληνικούς χαρακτήρες και όχι GreekLish. Παρακαλούμε επίσης κατά την διάρκεια της συμπλήρωσης της αίτησης σας να δείξετε την ανάλογη σοβαρότητα και τον ανάλογο σεβασμό. Τέλος σας παρακαλούμε να μην δίνετε ψευδή στοιχεία διότι η αίτηση σας θα απορριφθεί απευθείας!**");
                 
                         const button = new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setLabel("🔫")
                           .setCustomId("Allowlist");
                 
                         const actionRow = new ActionRowBuilder().addComponents(button);
                 
                         await message.channel.send({ embeds: [embed], components: [actionRow] });
                       } catch (e) {
                         console.log(e.message);
                       }
                     }
                   }
                 });
                 
                 client.on('interactionCreate', async interaction => {
                   if (!interaction.isButton()) return;
                 
                   if (interaction.customId === 'Allowlist') {
                     await interaction.deferReply({ ephemeral: true });
                 
                     try {
                       const user = interaction.user;
                       const guild = interaction.guild;
                 
                       const channel = await guild.channels.create({
                         name: `app-${user.username}`,
                         type: ChannelType.GuildText,
                         parent: '1053619043933880429',
                         permissionOverwrites: [
                           {
                             id: guild.roles.everyone.id,
                             deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                           },
                           {
                             id: user.id,
                             allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                           },
                         ],
                       });
                 
                       const questions = [
                        Allowlist.prwti,
                        Allowlist.defterh,
                        Allowlist.trith,
                        Allowlist.tetarth,
                        Allowlist.pemth,
                         Allowlist.ekth,
                       ];
                 
                       let answers = [];
                       for (const question of questions) {
                         const embed = new EmbedBuilder().setDescription(`\`\`\`${question}\`\`\``);
                         const sentMsg = await channel.send({ embeds: [embed] });
                 
                         const filter = m => m.author.id === user.id;
                         const collected = await channel.awaitMessages({ filter, max: 1, time: 5 * 60000 });
                         if (collected.size > 0) {
                           answers.push(collected.first().content);
                         } else {
                           await channel.send("⏳ Time expired! Please try again.");
                           return channel.delete();
                         }
                       }
                 
                       const embedFinal = new EmbedBuilder().setDescription("✅ **Η αίτηση σου στάλθηκε με επιτυχία!**");
                       await channel.send({ embeds: [embedFinal] });
                 
                       setTimeout(async () => {
                         await channel.delete();
                       }, 5000);
                 
                       const logEmbed = new EmbedBuilder()
                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                         .setDescription(`\`\`\`New Application\`\`\`\nΗ αίτηση έγινε από:\n> <@${user.id}>\n\n${questions.map((q, i) => `${q}\n> **${answers[i]}**\n\n`).join('')}`);
                         
                       const logChannel = interaction.client.channels.cache.get(logsappAllowlist);
                       if (logChannel) {
                         const logMessage = await logChannel.send({ embeds: [logEmbed] });
                         await logMessage.react('✅');
                         await logMessage.react('❌');
                       }
                 
                       await interaction.followUp({ content: 'Η αίτηση σου ολοκληρώθηκε και καταγράφηκε.', ephemeral: true });
                 
                     } catch (e) {
                       console.log(e.message);
                     }
                   }
                 });
             
                 client.on('messageReactionAdd', async (reaction, user) => {
                  if (reaction.message.channel.id !== logsappAllowlist || user.bot) return;
                
                  const message = reaction.message;
                  const guild = message.guild;
                
                  // Extract user ID from the log message
                  const userIdMatch = message.embeds[0].description.match(/<@(\d+)>/);
                  const userId = userIdMatch ? userIdMatch[1] : null;
                
                  if (!userId) return;
                
                  const applicant = await guild.members.fetch(userId).catch(() => null);
                
                  if (!applicant) return;
                
                  if (reaction.emoji.name === '✅') {
                    try {
                      const channel = await guild.channels.create({
                        name: `accepted-${applicant.user.username}`,
                        type: ChannelType.GuildText,
                        parent: '1053619043933880429',
                        permissionOverwrites: [
                          {
                            id: guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                          },
                          {
                            id: applicant.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                          },
                        ],
                      });
                
                      const embed = new EmbedBuilder()
                        .setDescription(`🎉 **Congratulations ${applicant.user.username}, your application has been accepted!**`);
                      await channel.send({ embeds: [embed] });
                
                      // Add the role to the applicant
                      const role = guild.roles.cache.get('1271903138366095520');
                      if (role) {
                        await applicant.roles.add(role);
                      }
                
                    } catch (e) {
                      console.log(e.message);
                    }
                  } else if (reaction.emoji.name === '❌') {
                    try {
                      const embed = new EmbedBuilder()
                        .setDescription(`❌ **Sorry ${applicant.user.username}, your application has been declined.**`);
                      await message.channel.send({ embeds: [embed] });
                    } catch (e) {
                      console.log(e.message);
                    }
                  }
                });









              

                client.on('messageCreate', message => {
                  if(message.content === '!ticket-setup2'){
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                          const embed = new EmbedBuilder()
                          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                          .setDescription("**Για να ανοίξετε κάποιο ticket πατήστε το κουμπί <:emoji_70:1271469778153766953> και θα σας εξυπηρετήσουμε άμεσα.**")
                          .setColor('#252dc2')
                          .setThumbnail(message.guild.iconURL({ dynamic: true }))
                          const row = new ActionRowBuilder()
                         .addComponents(
                       new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(`<:emoji_70:1271469778153766953>`)
                        .setCustomId(`openticket`)
              
                    );
                 message.channel.send({embeds: [embed], components: [row]})
              
                      }
                  }
              })
            client.on('interactionCreate',async interaction => {
                if (!interaction.isButton()) return;
                if(interaction.customId === "openticket") {
                 const embed = new EmbedBuilder()
                 .setDescription("**Επιλέξτε το θέμα που παρουσιάζει το ticket σας.**")
                 .setColor('#252dc2')
                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                 .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                 const row = new ActionRowBuilder()
                 .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Επιλέξτε.')
                        .addOptions([{
                                label: 'Ακύρωση',
                                description: 'Για ακύρωση του ticket.',
                                  emoji: '🛑',
                                value: 'cancel',
                            },
                {
                                label: 'Support',
                                description: 'Βοήθεια.',
                  emoji: '📞',
                                value: 'support',
                            },
                            {
                                label: 'Donate',
                                description: 'Ερώτηση για δωρεά.',
                  emoji: '💵',
                                value: 'donate',
                            },
                            {
                              label: 'Bugs',
                              description: 'Αναφορά Bugs.',
                emoji: '🐛',
                              value: 'bugs',
                          },
                            {
                              label: 'Free Job',
                              description: 'Αίτηση για free job.',
                emoji: '💼',
                              value: 'job',
                          },
                            {
                                label: 'Ban Appeal',
                                description: 'Αίτηση για unban.',
                  emoji: '🛑',
                                value: 'bappeal',
                            },
                            {
                                label: 'Staff Report',
                                description: 'Κάντε αναφορά κάποιου staff.',
                  emoji: '📛',
                                value: 'sreport',
                            },
                            {
                                label: 'Other',
                                description: 'Άλλο.',
                  emoji: '❓',
                                value: 'other',
                            },
                        ]),
                        
            
                  
                );
                interaction.reply({embeds: [embed], components: [row], ephemeral: true})
                }  if(interaction.customId === "close") {
                
                    await interaction.deferUpdate();
                    let thema = ''
                    if(interaction.channel.name.startsWith("📞ticket-")) thema = '📞 Support'
                    if(interaction.channel.name.startsWith("💵ticket-")) thema = '💵 Donate'
                    if(interaction.channel.name.startsWith("🛑ticket-")) thema = '🛑 Ban Appeal'
                    if(interaction.channel.name.startsWith("📛ticket-")) thema = '📛 Staff Report'
                    if(interaction.channel.name.startsWith("❓ticket-")) thema = '❓ Other'
                    if(interaction.channel.name.startsWith("💼ticket-")) thema = '💼 Free Job'
                    if(interaction.channel.name.startsWith("🐛ticket-")) thema = '🐛Bugs'
                    interaction.channel.delete()
                    const closelogs = new EmbedBuilder()
                   .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **\`${interaction.channel.name}\` • \`${thema}\`**`)
                .setColor('#252dc2')
                    client.channels.cache.get("1053619044235890713").send({embeds: [closelogs]}) //Ticket Logs Id
                    db.set(`${interaction.member.user.id}`, { anoixto: 'no' })
                
                }
            })
            
            client.on('interactionCreate',async interaction => {
                if (!interaction.isSelectMenu()) return;
            
            
                  if(interaction.values[0] === 'cancel') {
                  await interaction.deferUpdate();
                  const embed3 = new EmbedBuilder()
                  
                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                  .setDescription(`<a:online:1272085401741430888>    **Το ticket ακυρώθηκε!**`)
                  .setColor('#252dc2')
                  interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                  }
                  if(interaction.values[0] === 'job') {
                    await interaction.deferUpdate();
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                    .setColor('#ff0000')
                    .setDescription(`<a:info:947426133434068994> **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                    const kanali = await interaction.guild.channels.create({
                        name: `💼ticket-${interaction.member.user.username}`,
                        type: ChannelType.GuildText,
                        parent: '1053619045062156341',
                        
                            permissionOverwrites: [
                               {
                               id: interaction.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                               },
                               {
                                id: '1053619043917111373',
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                              {
                                id: interaction.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                            
                               
                            ],
                            }) 
                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                            const embed3 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                           .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                            .setColor('#ff0000')
                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                            const embed2 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setColor('#252dc2')
                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`🔒`)
                           .setCustomId(`close`) 
                           );
                          kanali.send({content: `<@&1053619043917111373>`,embeds: [embed2], components: [row]})
                          const embed4 = new EmbedBuilder()
                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#40f58e')
                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`💼 Job\`**`)
                        
                     client.channels.cache.get("1053619044235890713").send({embeds: [embed4]}) //Ticket Logs Id
                        }    if(interaction.values[0] === 'bugs') {
                
                          await interaction.deferUpdate();
                          const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                          .setColor('#ff0000')
                          .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                          if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                          const kanali = await interaction.guild.channels.create({
                              name: `🐛ticket-${interaction.member.user.username}`,
                              type: ChannelType.GuildText,
                              parent: '1053619045062156341',
                              
                                  permissionOverwrites: [
                                     {
                                     id: interaction.guild.roles.everyone, 
                                     deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                     },
                                     {
                                      id: '1053619043917111373',
                                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                   },
                                   {
                                    id: '1053619043850002583',
                                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                 },
                                    {
                                      id: interaction.member.user.id,
                                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                   },
                                  
                                     
                                  ],
                                  }) 
                                  db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                  const embed3 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                  .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                  .setColor('#252dc2')
                                  interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                  const embed2 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                  .setColor('#252dc2')
                                  .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                  const row = new ActionRowBuilder()
                                  .addComponents(
                                new ButtonBuilder()
                                 .setStyle(ButtonStyle.Secondary)
                                 .setEmoji(`🔒`)
                                 .setCustomId(`close`) 
                                 );
                                 kanali.send({content: `<@&1053619043850002583>`,embeds: [embed2], components: [row]})
                                 const embed4 = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                .setColor('#40f58e')
                                .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`🐛 Bugs\`**`)
                              
                           client.channels.cache.get("1053619044235890713").send({embeds: [embed4]}) //Ticket Logs Id
                              }
                  if(interaction.values[0] === 'support') {
                
                    await interaction.deferUpdate();
                    const embed = new EmbedBuilder()
                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                    .setColor('#ff0000')
                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                    const kanali = await interaction.guild.channels.create({
                        name: `📞ticket-${interaction.member.user.username}`,
                        type: ChannelType.GuildText,
                        parent: '1053619045062156341',
                        
                            permissionOverwrites: [
                               {
                               id: interaction.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                               },
                               {
                                id: '1053619043917111373',
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                             {
                              id: '1053619043850002583',
                              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                           },
                             
                              {
                                id: interaction.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                             },
                            
                               
                            ],
                            }) 
                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                            const embed3 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                            .setColor('#ff0000')
                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                            const embed2 = new EmbedBuilder()
                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                            .setColor('#ff0000')
                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`🔒`)
                           .setCustomId(`close`) 
                           );
                           kanali.send({content: `<@&1053619043850002583>`,embeds: [embed2], components: [row]})
                           const embed4 = new EmbedBuilder()
                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                          .setColor('#40f58e')
                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`📞 Support\`**`)
                        
                     client.channels.cache.get("1053619044235890713").send({embeds: [embed4]}) //tICKET Logs Id
                        } if(interaction.values[0] === 'donate') {
                
                            await interaction.deferUpdate();
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                            .setColor('#ff0000')
                            .setDescription(`<a:info:947426133434068994>   **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                            if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                            const kanali = await interaction.guild.channels.create({
                                 name: `💵ticket-${interaction.member.user.username}`, 
                                type: ChannelType.GuildText, 
                                parent: '1053619045062156341',
                                
                                    permissionOverwrites: [
                                     {
                                      id: interaction.guild.roles.everyone, 
                                     deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                       },
                                    {
                                       id: '1201491456460869692',
                                       allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                    },
                                    
                                  
                                      {
                                        id: interaction.member.user.id,
                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                     },
                                    
                                       
                                    ],
                                    }) 
                                    db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                    const embed3 = new EmbedBuilder()
                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                    .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                    .setColor('#252dc2')
                                    interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                    const embed2 = new EmbedBuilder()
                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                    .setColor('#252dc2')
                                    .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                    const row = new ActionRowBuilder()
                                    .addComponents(
                                  new ButtonBuilder()
                                   .setStyle(ButtonStyle.Secondary)
                                   .setEmoji(`🔒`)
                                   .setCustomId(`close`) 
                                   );
                                   kanali.send({content: `<@&1201491456460869692>`,embeds: [embed2], components: [row]})
                                   const embed4 = new EmbedBuilder()
                                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                  .setColor('#40f58e')
                                  .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`💵 Donate\`**`)
                                 
                             client.channels.cache.get("1053619044235890713").send({embeds: [embed4]}) //Tickets Logs Id
                                }if(interaction.values[0] === 'bappeal') {
                
                                    await interaction.deferUpdate();
                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                    .setColor('#252dc2')
                                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                    const kanali = await interaction.guild.channels.create({
                                        name: `🛑ticket-${interaction.member.user.username}`,
                                        type: ChannelType.GuildText, 
                                        parent: '1053619045062156341',
                                        
                                            permissionOverwrites: [
                                               {
                                               id: interaction.guild.roles.everyone, 
                                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                               },
                                               {
                                                id: '1053619043917111373',
                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                             },
                                             {
                                              id: '1053619043850002583',
                                              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                           },

                                              {
                                                id: interaction.member.user.id,
                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                             },
                                            
                                               
                                            ],
                                            }) 
                                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                            const embed3 = new EmbedBuilder()
                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                            .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                            .setColor('#252dc2')
                                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                            const embed2 = new EmbedBuilder()
                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                            .setColor('#252dc2')
                                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                            const row = new ActionRowBuilder()
                                            .addComponents(
                                          new ButtonBuilder()
                                           .setStyle(ButtonStyle.Secondary)
                                           .setEmoji(`🔒`)
                                           .setCustomId(`close`) 
                                           );
                                           kanali.send({content: `<@&1053619043850002583>`,embeds: [embed2], components: [row]})
                                           const embed4 = new EmbedBuilder()
                                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                          .setColor('#40f58e')
                                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`🛑 Ban Appeal\`**`)
                                       
                                     client.channels.cache.get("1053619044235890713").send({embeds: [embed4]})//Tickets Logs Id
                                        }
                                        if(interaction.values[0] === 'sreport') {
                
                                            await interaction.deferUpdate();
                                            const embed = new EmbedBuilder()
                                            .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                            .setColor('#ff0000')
                                            .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                            if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                            const kanali = await interaction.guild.channels.create({
                                                name: `📛ticket-${interaction.member.user.username}`,  
                                                type: ChannelType.GuildText, 
                                                parent: '1053619045062156341',
                                                
                                                    permissionOverwrites: [
                                                       {
                                                       id: interaction.guild.roles.everyone, 
                                                       deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                                       },
                                                       {
                                                        id: '1175124953805357097',
                                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                     },
                                              
        
                                                      {
                                                        id: interaction.member.user.id,
                                                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                     },
                                                    
                                                       
                                                    ],
                                                    }) 
                                                    db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                                    const embed3 = new EmbedBuilder()
                                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                    .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                                    .setColor('#252dc2')
                                                    interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                                    const embed2 = new EmbedBuilder()
                                                   .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                    .setColor('#252dc2')
                                                    .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                                    const row = new ActionRowBuilder()
                                                    .addComponents(
                                                  new ButtonBuilder()
                                                   .setStyle(ButtonStyle.Secondary)
                                                   .setEmoji(`🔒`)
                                                   .setCustomId(`close`) 
                                                   );
                                                   kanali.send({content: `<@&1175124953805357097>`,embeds: [embed2], components: [row]})
                                                   const embed4 = new EmbedBuilder()
                                                 .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                                  .setColor('#40f58e')
                                                  .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`📛 Staff Report\`**`)
                                                 
                                             client.channels.cache.get("1053619044235890713").send({embeds: [embed4]})//Tickets Logs Id
                                                }  if(interaction.values[0] === 'other') {
                
                                                    await interaction.deferUpdate();
                                                    const embed = new EmbedBuilder()
                                                    .setAuthor({ name: interaction.member.user.username, iconURL:  interaction.member.user.avatarURL({ dynamic: true })})
                                                    .setColor('#ff0000')
                                                    .setDescription(`<a:info:947426133434068994>  **Έχεις ήδη ένα ticket ανοιχτό  <#${db.get(`${interaction.member.user.id}.id`)}> , θα πρέπει να το κλείσεις για να μπορείς να κάνεις άλλο.**`)
                                                    if(db.get(`${interaction.member.user.id}.anoixto`) === 'yes' && interaction.guild.channels.cache.get(`${db.get(`${interaction.member.user.id}.id`)}`)) return interaction.editReply({embeds: [embed], components: [], ephemeral: true});
                                                    const kanali = await interaction.guild.channels.create({
                                                        name: `❓ticket-${interaction.member.user.username}`,
                                                        type: ChannelType.GuildText, 
                                                        parent: '1053619045062156341',
                                                        
                                                            permissionOverwrites: [
                                                               {
                                                               id: interaction.guild.roles.everyone, 
                                                               deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] 
                                                               },
                                                               {
                                                                id: '1053619043917111373',
                                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                             },
                                                             {
                                                              id: '1053619043850002583',
                                                              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                           },
                
                                                             
                                                              {
                                                                id: interaction.member.user.id,
                                                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                                                             },
                                                            
                                                               
                                                            ],
                                                            }) 
                                                            db.set(`${interaction.member.user.id}`, { anoixto: 'yes', id: `${kanali.id}`, name: `${kanali.name}` })
                                                            const embed3 = new EmbedBuilder()
                                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                            .setDescription(`<a:online:1272085401741430888>    **Το ticket άνοιξε με επιτυχία!** <#${kanali.id}>`)
                                                            .setColor('#252dc2')
                                                            interaction.editReply({embeds: [embed3], components: [], ephemeral: true});
                                                            const embed2 = new EmbedBuilder()
                                                           .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true}) })
                                                            .setColor('#252dc2')
                                                            .setDescription("**Παρακαλώ περίμενετε μέχρι κάποιος από την ομάδα μας να σας εξυπηρετήσει.**\n\n> Εαν θέλετε να κλείσετε το ticket πατήστε το `🔒`.")
                                                            const row = new ActionRowBuilder()
                                                            .addComponents(
                                                          new ButtonBuilder()
                                                           .setStyle(ButtonStyle.Secondary)
                                                           .setEmoji(`🔒`)
                                                           .setCustomId(`close`) 
                                                           );
                                                           kanali.send({content: `<@&1053619043850002583>`,embeds: [embed2], components: [row]})
                                                           const embed4 = new EmbedBuilder()
                                                         .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                                          .setColor('#40f58e')
                                                          .setDescription(`> \`Χρήστης:\` ${interaction.member}\n\n> \`Ticket:\` **[\`${kanali.name}\`](https://discord.com/channels/${interaction.guild.id}/${kanali.id}) • \`❓ Other\`**`)
                                                         
                                                     client.channels.cache.get("1053619044235890713").send({embeds: [embed4]})//Tickets Logs Id
                                                        } 
                })
                
                client.on('messageCreate', async message => {
                    if (message.content === '!onduty') {
                        if (message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                            const embed = new EmbedBuilder()
                                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                                .setColor('#252dc2')
                                .setDescription("> **Για να πας `On Duty` πάτα το κουμπί <a:online:1272085401741430888>.**\n\n > **Για να πας `Off Duty` πάτα το κουμπί <a:offline:1272085724761423937>.**\n\n > **Για να δεις πόσες `ώρες` έχεις πάτα το κουμπί <a:Fire1:1271919083360620564>.**\n\n > **Για να δεις το `Leaderboard` των ωρών πάτα το κουμπί <a:agolden_crown_animated:1269684810616406037>.**");
                
                            const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setStyle(ButtonStyle.Secondary)
                                        .setEmoji('<a:online:1272085401741430888>')
                                        .setCustomId('onduty'),
                                    new ButtonBuilder()
                                        .setStyle(ButtonStyle.Secondary)
                                        .setEmoji('<a:offline:1272085724761423937>')
                                        .setCustomId('offduty'),
                                    new ButtonBuilder()
                                        .setStyle(ButtonStyle.Secondary)
                                        .setEmoji('<a:Fire1:1271919083360620564>')
                                        .setCustomId('hours'),
                                    new ButtonBuilder()
                                        .setStyle(ButtonStyle.Secondary)
                                        .setEmoji('<a:agolden_crown_animated:1269684810616406037>')
                                        .setCustomId('lb')
                                );
                
                            await message.channel.send({ embeds: [embed], components: [row] });
                        }
                    }
                });
                
                client.on('interactionCreate', async interaction => {
                  if (!interaction.isButton()) return;
              
                  if (interaction.customId === "onduty") {
                      if (db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`) === `yes`) {
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                              .setColor('#252dc2')
                              .setDescription("<a:Siren:1271446871063396545> **Είσαι ήδη On Duty.**");
                          interaction.reply({ embeds: [embed], ephemeral: true });
                      } else {
                          const date = new Date().getTime();
                          await db.set(`${interaction.guild.id}.${interaction.member.user.id}`, { di: date });
                          await db.set(`energos_${interaction.guild.id}_${interaction.member.user.id}`, `yes`);
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                              .setColor('#252dc2')
                              .setDescription("<a:online:1272085401741430888> **Μπήκες με επιτυχία On Duty.**");
                          interaction.reply({ embeds: [embed], ephemeral: true });
                      }
                  }
              
                  if (interaction.customId === "offduty") {
                      if (db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`) === `no` || !db.get(`energos_${interaction.guild.id}_${interaction.member.user.id}`)) {
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                              .setColor('#252dc2')
                              .setDescription("<a:Siren:1271446871063396545> **Είσαι ήδη Off Duty.**");
                          interaction.reply({ embeds: [embed], ephemeral: true });
                      } else {
                          const date2 = db.get(`${interaction.guild.id}.${interaction.member.user.id}.di`);
                          const date3 = new Date().getTime();
                          const date4 = date3 - date2;
                          const minutes = Math.floor(date4 / (1000 * 60)); // Calculate minutes directly
              
                          if (minutes > 0) {
                              db.add(`lepta_${interaction.guild.id}_${interaction.member.user.id}`, minutes);
                          }
              
                          await db.set(`energos_${interaction.guild.id}_${interaction.member.user.id}`, `no`);
                          await db.set(`energostime_${interaction.guild.id}_${interaction.member.user.id}`, `<t:${parseInt((new Date().getTime() / 1000).toFixed(0))}:R>`);
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                              .setColor('#252dc2')
                              .setDescription("<a:online:1272085401741430888> **Μπήκες με επιτυχία Off Duty.**");
                          interaction.reply({ embeds: [embed], ephemeral: true });
                      }
                  }
              
                  if (interaction.customId === "hours") {
                      const minutes = db.get(`lepta_${interaction.guild.id}_${interaction.member.user.id}`) || 0;
              
                      const embed = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                          .setColor('#ff0000')
                          .setDescription(`**Έχεις ${minutes} λεπτά.**`);
                      interaction.reply({ embeds: [embed], ephemeral: true });
                  }
              
                  if (interaction.customId === "lb") {
                      // Fetch the leaderboard data
                      let data = db.all().filter(data => data.ID.startsWith(`lepta_${interaction.guild.id}`)).sort((a, b) => b.data - a.data);
                      if (data.length === 0) {
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
                              .setColor('#ff0000')
                              .setDescription(`<a:Siren:1271446871063396545> **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`);
                          return interaction.reply({ embeds: [embed], ephemeral: true });
                      }
              
                      // Paginate the data
                      let page = 0;
                      const itemsPerPage = 10;
                      const totalPages = Math.ceil(data.length / itemsPerPage);
              
                      const generateLeaderboardEmbed = (page) => {
                          const start = page * itemsPerPage;
                          const end = start + itemsPerPage;
                          const pageData = data.slice(start, end);
                          let content = pageData.map((entry, index) => {
                              const user = client.users.cache.get(entry.ID.split('_')[2]);
                              if (user) {
                                  const minutes = entry.data;
                                  const lastActive = db.get(`energostime_${interaction.guild.id}_${user.id}`);
                                  return `**\`${start + index + 1}\`. ${user} ➡ ${minutes} Λεπτά | Τελευταία στιγμή ενεργός: ${lastActive}**`;
                              }
                              return null;
                          }).filter(item => item !== null).join('\n');
              
                          const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                              .setColor('#252dc2')
                              .setDescription(content)
                              .setFooter({ text: `Σελίδα ${page + 1}/${totalPages}` });
              
                          const row = new ActionRowBuilder()
                              .addComponents(
                                  new ButtonBuilder()
                                      .setStyle(ButtonStyle.Secondary)
                                      .setEmoji('⬅')
                                      .setCustomId('previousPage')
                                      .setDisabled(page === 0),
                                  new ButtonBuilder()
                                      .setStyle(ButtonStyle.Secondary)
                                      .setEmoji('➡')
                                      .setCustomId('nextPage')
                                      .setDisabled(page === totalPages - 1)
                              );
              
                          return { embed, row };
                      };
              
                      const { embed, row } = generateLeaderboardEmbed(page);
                      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
              
                      const collector = interaction.channel.createMessageComponentCollector({
                          time: 60000,
                          filter: i => i.user.id === interaction.user.id
                      });
              
                      collector.on('collect', async i => {
                          if (i.customId === 'nextPage' && page < totalPages - 1) {
                              page++;
                          } else if (i.customId === 'previousPage' && page > 0) {
                              page--;
                          }
              
                          const { embed, row } = generateLeaderboardEmbed(page);
                          await i.update({ embeds: [embed], components: [row] });
                      });
              
                      collector.on('end', collected => {
                          // Optionally edit the final message to remove buttons or show that the interaction has ended.
                      });
                  }
              });
              
                

                client.on('messageCreate', message => {
                  if(message.channel.id === '1228721486857244724'){ //Suggestion Channel Id
                      message.react('<:1_:1211251107423330304>') //Id apo to +1 emoji
                      message.react('<:1_:1211251122765963335>') //Id apo to -1 emoji
                  }
              })
              
              client.on('voiceStateUpdate',async (oldMember, newMember, newState) => {
                let newUserChannel = newMember.channel;
                let oldUserChannel = oldMember.channel;
                
                if (newUserChannel && newUserChannel.id === '1053619045238309002') {  //Support Channel Id
                  try {
                    const kanali = await oldMember.guild.channels.create({
                      name: `📞Support`,
                      type: ChannelType.GuildVoice,
                      parent: '1053619045062156347', //Kathgoria Poy tha kanei to new support channel
                      
                          permissionOverwrites: [
                             {
                             id: oldMember.guild.roles.everyone, 
                             deny: [PermissionsBitField.Flags.ViewChannel] 
                             },
                             {
                              id: '1053619043850002583',
                              allow: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                              id: '1053619043917111373',
                              allow: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                              id: oldMember.member.user.id,
                              allow: [PermissionsBitField.Flags.ViewChannel]
                           },
                          
                             
                          ],
                          }) 
                          oldMember.member.voice.setChannel(kanali)

                          const embed = new EmbedBuilder()
                          .setColor('#40f58e')
                          .setAuthor({name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dyanamic: true })})
                          .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Support:\` ${kanali}`)
                          client.channels.cache.get('1269434157495353395').send({embeds: [embed], content: '<@&1053619043850002583>'}) //Nottifications Channel Id
                  } catch(e) {
                  console.log(e)
                  }
                } else if (oldUserChannel && oldUserChannel.name === `📞Support` && oldUserChannel.members.size === 0) { 
                  try{
              
                   oldUserChannel.delete()
                  }catch(e){
                    console.log(e)
                  }
                }  if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel.name === `📞Support` && newUserChannel.id === '1053619045238309002' && oldUserChannel.members.size === 0) { //sSupport Channel Id
          
                  try{
                  
                 oldUserChannel.delete()
                   }catch(e){
                     console.log(e)
                   }
                }
                });			
                
          
              
                client.on('voiceStateUpdate',async (oldMember, newMember, newState) => {
                  let newUserChannel = newMember.channel;
                  let oldUserChannel = oldMember.channel;
                  
                  if (newUserChannel && newUserChannel.id === '1053619045238309001') { //Donate Channel Id
                    try {
                      const kanali = await oldMember.guild.channels.create({
                        name: `💸Donate`,
                        type: ChannelType.GuildVoice,
                        parent: '1266323003831226479', //Category poy tha kanei to donat channel
                        
                            permissionOverwrites: [
                               {
                               id: oldMember.guild.roles.everyone, 
                               deny: [PermissionsBitField.Flags.ViewChannel] 
                               },
                               {
                                id: '1053619043917111375',
                                allow: [PermissionsBitField.Flags.ViewChannel]
                             },
                             

                              {
                                id: oldMember.member.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel]
                             },
                            
                               
                            ],
                            }) 
                            oldMember.member.voice.setChannel(kanali)
                            const embed = new EmbedBuilder()
                            .setColor('#40f58e')
                            .setAuthor({name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dyanamic: true })})
                            .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Donate:\` ${kanali}`)
                            client.channels.cache.get('1269434227015946371').send({embeds: [embed], content: '<@&1053619043917111375>'}) //Notifications Channel Id
                    } catch(e) {
                    console.log(e)
                    }
                  } else if (oldUserChannel && oldUserChannel.name === `💸Donate` && oldUserChannel.members.size === 0 ) { 
                    try{
                     oldUserChannel.delete()
                    }catch(e){
                      console.log(e)
                    }
                  } if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel.name === `💸Donate` && newUserChannel.id === '1053619045238309001' && oldUserChannel.members.size === 0) { //Donate ChANNEL iD
          
                    try{
                    
                   oldUserChannel.delete()
                     }catch(e){
                       console.log(e)
                     }
                  }
                  });		
                  






                  client.on('voiceStateUpdate',async (oldMember, newMember, newState) => {
                    let newUserChannel = newMember.channel;
                    let oldUserChannel = oldMember.channel;
                    
                    if (newUserChannel && newUserChannel.id === '1248961133008654359') { //Mafia Channel Id
                      try {
                        const kanali = await oldMember.guild.channels.create({
                          name: `🔫Mafia`,
                          type: ChannelType.GuildVoice,
                          parent: '1272653698450853999', //Category poy tha kanei to donat channel
                          
                              permissionOverwrites: [
                                 {
                                 id: oldMember.guild.roles.everyone, 
                                 deny: [PermissionsBitField.Flags.ViewChannel] 
                                 },
                                 {
                                  id: '1228707378174623814',
                                  allow: [PermissionsBitField.Flags.ViewChannel]
                               },
                               
  
                                {
                                  id: oldMember.member.user.id,
                                  allow: [PermissionsBitField.Flags.ViewChannel]
                               },
                              
                                 
                              ],
                              }) 
                              oldMember.member.voice.setChannel(kanali)
                              const embed = new EmbedBuilder()
                              .setColor('#40f58e')
                              .setAuthor({name: oldMember.guild.name, iconURL: oldMember.guild.iconURL({ dyanamic: true })})
                              .setDescription(`> \`Χρήστης:\` ${oldMember.member}\n\n> \`Mafia:\` ${kanali}`)
                              client.channels.cache.get('1250756790455500842').send({embeds: [embed], content: '<@&1228707378174623814>'}) //Notifications Channel Id
                      } catch(e) {
                      console.log(e)
                      }
                    } else if (oldUserChannel && oldUserChannel.name === `🔫Mafia` && oldUserChannel.members.size === 0 ) { 
                      try{
                       oldUserChannel.delete()
                      }catch(e){
                        console.log(e)
                      }
                    } if (oldUserChannel !== null && newUserChannel !== null && oldUserChannel.name === `🔫Mafia` && newUserChannel.id === '1248961133008654359' && oldUserChannel.members.size === 0) { //Donate ChANNEL iD
            
                      try{
                      
                     oldUserChannel.delete()
                       }catch(e){
                         console.log(e)
                       }
                    }
                    });		


                 


                  client.on('messageCreate', message => {
                    if(message.content === "!lock" || message.content === "!LOCK"){
                        if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)){
                            message.delete()
                            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                            .setDescription("**Το κανάλι κλειδώθηκε από την ομάδα διαχείρησης.**")
                            .setColor('#ff0000') 
                            message.channel.send({embeds: [embed]})
                        }
                    }
                })
                client.on('messageCreate', message => {
                    if(message.content === "!unlock" || message.content === "!UNLOCK"){
                        if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) || message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)){
                            message.delete()
                            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
                            const embed = new EmbedBuilder()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                            .setDescription("**Το κανάλι ξεκλειδώθηκε από την ομάδα διαχείρησης.**")
                            .setColor('#40f58e')
                            message.channel.send({embeds: [embed]})
                        }
                    }
                })
                client.on('messageCreate', message => {
  
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                      const embed = new EmbedBuilder()
                      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(say)
                      message.channel.send({embeds: [embed]})
                      message.delete()
                      }
                    }
                   
                 })
            
                 client.on('messageCreate', message => {
    
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say3') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                      const embed = new EmbedBuilder()
                      
                      .setColor('#252dc2')
                      .setDescription(say)
                      message.channel.send({embeds: [embed]})
                      message.delete()
                      }
                    }
                   
                 })
                 client.on('messageCreate', message => {
  
                  const args = message.content.slice(prefix.length).trim().split(' ');
                    const command = args.shift().toLowerCase();
                    if (command === 'say2') {
                      if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                      if (!message.content.startsWith(prefix) || message.author.bot) return;
                      
                      const user = message.author;
                      
                     
                
                      const say = args.join(" ");
                      if(!say) return;
                   
                      message.channel.send({content: say})
                      message.delete()
                      }
                    }
                   
                 })
                 client.on('messageCreate',async message => {
                  if(message.content === '!invites' || message.content === '!INVITES' || message.content === '!Invites'){
                  
                      let all = await db.get(`invites_${message.guild.id}_all_${message.member.user.id}`)
                      let real = await db.get(`invites_${message.guild.id}_real_${message.member.user.id}`)
                      let leave = await db.get(`invites_${message.guild.id}_leave_${message.member.user.id}`)
                      let fake = await db.get(`invites_${message.guild.id}_fake_${message.member.user.id}`)
                      if(!all) all = `0`
                      if(!real) real = `0`
                      if(!leave) leave = `0`
                      if(!fake) fake = `0`
                      const embed = new EmbedBuilder()
                      .setAuthor({name: message.member.user.username, iconURL: message.member.user.avatarURL({dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(`Έχεις **${real}** Invites. (**${all}** συνολικά, **${leave}** έχουν αποχωρήσει, **${fake}** ψεύτικα)`)
                      message.channel.send({embeds: [embed]})
                    
                  }
              })
              
              client.on('messageCreate',async message => {
                  if(message.content === '!lb' || message.content === '!LB' || message.content === '!Lb' || message.content === '!leaderboard' || message.content === '!LEADERBOARD' || message.content === '!Leaderboard'){
                 


                    let data = db.all().filter(data => data.ID.startsWith(`invites_${message.guild.id}_real`)).sort((a, b) => b.data - a.data)
                      const embed92 = new EmbedBuilder()
                      .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true })})
                      .setColor('#252dc2')
                      .setDescription(`<a:Siren:1271446871063396545>    **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                      if(data.length === 0) return message.channel.send({ embeds: [embed92]})
                      let selida = ''
                      if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                      if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                      if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                      if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                      if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                      if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                      if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                      if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                      if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                      if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                      if(data.length > 100) selida = `10`
                      console.log(data.length)
                   
                      if(data.length > 10){
                        console.log(data)
                        console.log('test')
                        let content = "";
                        for(let i = 0; i < 10; i++){
                         let user = client.users.cache.get(data[i].ID.split('_')[3])
                         if(user){
               
                       
                        
                         let wres = data[i].data;
                         let synolikamm = '0'
                       let alhthinamm = '0'
                       let apoxorisei = '0'
                       let pseftikamm = '0'
                      if(db.get(`invites_${message.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${message.guild.id}_all_${user.id}`)
                      if(db.get(`invites_${message.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${message.guild.id}_real_${user.id}`)
                       if(db.get(`invites_${message.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${message.guild.id}_leave_${user.id}`)
                       if(db.get(`invites_${message.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${message.guild.id}_fake_${user.id}`)
                        
                        
                    
                         content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                       }
                        }
                        const embed = new EmbedBuilder()
                          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                          .setColor('#252dc2')
                        .setDescription(content)
                        .setFooter({text: `Σελίδα 1/${selida}`})
                        const row = new ActionRowBuilder()
                        .addComponents(
                      new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                       .setCustomId(`igoto1`)
                       .setDisabled(),
              
                       new ButtonBuilder()
                       .setStyle(ButtonStyle.Secondary)
                       .setEmoji(`<a:RightArrow:1069363674579468328>`)
                       .setCustomId(`igoto2`)
              
              
                   );
                   message.channel.send({embeds: [embed], components: [row]})
              
                      }else{
                        const embed92 = new EmbedBuilder()
                        .setAuthor({ name: message.member.user.username, iconURL: message.member.user.avatarURL({ dynamic: true })})
                        .setColor('#252dc2')
                        .setDescription(`<a:Siren:1271446871063396545>    **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                        if(data.length === 0) return message.channel.send({ embeds: [embed92], ephemeral: true });
                        console.log('test')
                        console.log(data)
                     let content = "";
                     for(let i = 0; i < data.length; i++){
                       let user = client.users.cache.get(data[i].ID.split('_')[3])
                       if(user){
              
                     
                      
                       let wres = data[i].data;
                       let synolikamm = '0'
                     let alhthinamm = '0'
                     let apoxorisei = '0'
                     let pseftikamm = '0'
                    if(db.get(`invites_${message.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${message.guild.id}_all_${user.id}`)
                    if(db.get(`invites_${message.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${message.guild.id}_real_${user.id}`)
                     if(db.get(`invites_${message.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${message.guild.id}_leave_${user.id}`)
                     if(db.get(`invites_${message.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${message.guild.id}_fake_${user.id}`)
                      
                      
                  
                       content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                     }
                      }
                      const embed = new EmbedBuilder()
                        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                        .setColor('#252dc2')
                      .setDescription(content)
                      .setFooter({text: `Σελίδα 1/${selida}`})
                      const row = new ActionRowBuilder()
                      .addComponents(
                        new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                         .setCustomId(`igoto1`)
                         .setDisabled(),
              
                         new ButtonBuilder()
                         .setStyle(ButtonStyle.Secondary)
                         .setEmoji(`<a:RightArrow:1069363674579468328>`)
                         .setCustomId(`igoto2`)
                         .setDisabled()
               
                     );
                     message.channel.send({embeds: [embed], components: [row]})
                    }
                   
                  }
                
              })
              
              
              client.on('interactionCreate',async interaction => {
                  if (!interaction.isButton()) return;
              
                      if(interaction.customId === "igoto1") {
                          await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                          const embed92 = new EmbedBuilder()
                          .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                          .setColor('#252dc2')
                          .setDescription(`<a:Siren:1271446871063396545>    **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                          if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true })
                          let selida = ''
                          if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                          if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                          if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                          if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                          if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                          if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                          if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                          if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                          if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                          if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                          if(data.length > 100) selida = `10`
                          console.log(data.length)
                       
                          if(data.length > 10){
                            console.log(data)
                            console.log('test')
                            let content = "";
                            for(let i = 0; i < 10; i++){
                             let user = client.users.cache.get(data[i].ID.split('_')[3])
                             if(user){
                    
                           
                            
                             let wres = data[i].data;
                             let synolikamm = '0'
                           let alhthinamm = '0'
                           let apoxorisei = '0'
                           let pseftikamm = '0'
                          if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                            
                            
                        
                             content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                           }
                            }
                            const embed = new EmbedBuilder()
                              .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                              .setColor('#252dc2')
                            .setDescription(content)
                            .setFooter({text: `Σελίδα 1/${selida}`})
                            const row = new ActionRowBuilder()
                            .addComponents(
                          new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                           .setCustomId(`igoto1`)
                           .setDisabled(),
                    
                           new ButtonBuilder()
                           .setStyle(ButtonStyle.Secondary)
                           .setEmoji(`<a:RightArrow:1069363674579468328>`)
                           .setCustomId(`igoto2`)
                    
                    
                       );
                       interaction.message.edit({embeds: [embed], components: [row]})
                    
                          }else{
                            const embed92 = new EmbedBuilder()
                            .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true })})
                            .setColor('#252dc2')
                            .setDescription(`<a:Siren:1271446871063396545>    **Δεν υπάρχει κανένας χρήστης στο Leaderboard.**`)
                            if(data.length === 0) return interaction.reply({ embeds: [embed92], ephemeral: true });
                            console.log('test')
                            console.log(data)
                         let content = "";
                         for(let i = 0; i < data.length; i++){
                           let user = client.users.cache.get(data[i].ID.split('_')[3])
                           if(user){
                    
                         
                          
                           let wres = data[i].data;
                           let synolikamm = '0'
                         let alhthinamm = '0'
                         let apoxorisei = '0'
                         let pseftikamm = '0'
                        if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                        if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                          
                          
                      
                           content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                         }
                          }
                          const embed = new EmbedBuilder()
                            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                            .setColor('#252dc2')
                          .setDescription(content)
                          .setFooter({text: `Σελίδα 1/${selida}`})
                          const row = new ActionRowBuilder()
                          .addComponents(
                            new ButtonBuilder()
                             .setStyle(ButtonStyle.Secondary)
                             .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                             .setCustomId(`igoto1`)
                             .setDisabled(),
                    
                             new ButtonBuilder()
                             .setStyle(ButtonStyle.Secondary)
                             .setEmoji(`<a:RightArrow:1069363674579468328>`)
                             .setCustomId(`igoto2`)
                             .setDisabled()
                    
                         );
                         interaction.message.edit({embeds: [embed], components: [row]})
                        }
                       
                         }   if(interaction.customId === "igoto2") {
                          console.log('BLACK')
                           await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 20){
                    
                             let content = "";
                             for(let i = 10; i < 20; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 2/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto1`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto3`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 10; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 2/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto1`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto3`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto3") {
                          await interaction.deferUpdate();
                          let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 30){
                    
                             let content = "";
                             for(let i = 20; i < 30; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 3/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto2`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto4`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 20; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 3/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto2`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto4`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto4") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 40){
                    
                             let content = "";
                             for(let i = 30; i < 40; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 4/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto3`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto5`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 30; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           }
                         console.log(data)
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 4/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto3`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto5`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto5") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 50){
                    
                             let content = "";
                             for(let i = 40; i < 50; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 5/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto4`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto6`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 40; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                            if(user){
                    
                          
                           
                            let wres = data[i].data;
                            let synolikamm = '0'
                          let alhthinamm = '0'
                          let apoxorisei = '0'
                          let pseftikamm = '0'
                         if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                         if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                          if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                           
                           
                       
                            content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                          }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 5/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto4`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto6`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto6") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 60){
                    
                             let content = "";
                             for(let i = 50; i < 60; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 6/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto5`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto7`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 60; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 6/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto5`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto7`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto7") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 70){
                    
                             let content = "";
                             for(let i = 60; i < 70; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 7/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto6`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto8`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 70; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 7/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto6`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto8`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto8") {
                          interaction.update()
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 80){
                    
                             let content = "";
                             for(let i = 70; i < 80; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 8/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto7`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto9`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                           
                        
                          let content = "";
                          for(let i = 80; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 8/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto7`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto9`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         } if(interaction.customId === "igoto9") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 90){
                    
                             let content = "";
                             for(let i = 80; i < 90; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 9/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto8`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto10`)
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 90; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 9/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto9`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto10`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }  if(interaction.customId === "igoto10") {
                          await interaction.deferUpdate();
                        let data = db.all().filter(data => data.ID.startsWith(`invites_${interaction.guild.id}_real`)).sort((a, b) => b.data - a.data)
                           let selida = ''
                           if(data.length === 1 || data.length < 10 || data.length === 10) selida = `1`
                           if(data.length < 20 && data.length > 10 || data.length === 20) selida = `2`
                           if(data.length < 30 &&  data.length > 20 || data.length === 30) selida = `3`
                           if(data.length < 40 &&  data.length > 30 || data.length === 40) selida = `4`
                           if(data.length < 50 &&  data.length > 40 || data.length === 50) selida = `5`
                           if(data.length < 60 && data.length > 50 || data.length === 60) selida = `6`
                           if(data.length < 70 && data.length > 60 || data.length === 70) selida = `7`
                           if(data.length < 80 && data.length > 70 || data.length === 80) selida = `8`
                           if(data.length < 90 && data.length > 80 || data.length === 90) selida = `9`
                           if(data.length < 100 && data.length > 90 || data.length === 100) selida = `10`
                           if(data.length > 100) selida = `10`
                           
                           if(data.length > 100){
                    
                             let content = "";
                             for(let i = 90; i < 100; i++){
                              let user = client.users.cache.get(data[i].ID.split('_')[3])
                              if(user){
                    
                            
                             
                              let wres = data[i].data;
                              let synolikamm = '0'
                            let alhthinamm = '0'
                            let apoxorisei = '0'
                            let pseftikamm = '0'
                           if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                           if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                            if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                             
                             
                         
                              content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                            }
                             }
                             const embed = new EmbedBuilder()
                               .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                               .setColor('#252dc2')
                             .setDescription(content)
                             .setFooter({text: `Σελίδα 10/${selida}`})
                             const row = new ActionRowBuilder()
                             .addComponents(
                           new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                            .setCustomId(`igoto9`),
                    
                            new ButtonBuilder()
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<a:RightArrow:1069363674579468328>`)
                            .setCustomId(`igoto10`)
                            .setDisabled()
                    
                    
                        );
                        interaction.message.edit({embeds: [embed], components: [row]})
                    
                           }else{
                         
                        
                          let content = "";
                          for(let i = 100; i < data.length; i++){
                            let user = client.users.cache.get(data[i].ID.split('_')[3])
                                if(user){
                      
                              
                               
                                let wres = data[i].data;
                                let synolikamm = '0'
                              let alhthinamm = '0'
                              let apoxorisei = '0'
                              let pseftikamm = '0'
                             if(db.get(`invites_${interaction.guild.id}_all_${user.id}`)) synolikamm = db.get(`invites_${interaction.guild.id}_all_${user.id}`)
                             if(db.get(`invites_${interaction.guild.id}_real_${user.id}`)) alhthinamm = db.get(`invites_${interaction.guild.id}_real_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_leave_${user.id}`)) apoxorisei = db.get(`invites_${interaction.guild.id}_leave_${user.id}`)
                              if(db.get(`invites_${interaction.guild.id}_fake_${user.id}`)) pseftikamm = db.get(`invites_${interaction.guild.id}_fake_${user.id}`)
                               
                               
                           
                                content += `**\`${i+1}\`.** ${user} <a:RightArrow:1069363674579468328> **${alhthinamm}** Invites. (**${synolikamm}** συνολικά, **${apoxorisei}** έχουν αποχωρήσει, **${pseftikamm}** ψεύτικα) \n`
                              }
                           
                           }
                           const embed = new EmbedBuilder()
                             .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                             .setColor('#252dc2')
                           .setDescription(content)
                           .setFooter({text: `Σελίδα 10/${selida}`})
                           const row = new ActionRowBuilder()
                           .addComponents(
                         new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:LeftArrow:1067913971358765146>
`)
                          .setCustomId(`igoto9`),
                    
                          new ButtonBuilder()
                          .setStyle(ButtonStyle.Secondary)
                          .setEmoji(`<a:RightArrow:1069363674579468328>`)
                          .setCustomId(`igoto10`)
                          .setDisabled()
                    
                    
                      );
                      interaction.message.edit({embeds: [embed], components: [row]})
                         }
                         }
                  
              })
              client.on('messageCreate',async message => {
                if(message.content ==='!status'){
          
                
             
       
                  try{
                  const { data } = await axios.get(`http://${ip}/dynamic.json`);
                  const regex = /\[([0-9]+)\]/;
                  const queue = data.hostname.match(regex);
                  if(queue){
                    const embed = new EmbedBuilder()
                    .setTitle('<a:online:1272085401741430888>    Online')
                    .addFields(
                      { name: 'Players', value: `**${data.clients}/${data.sv_maxclients}**`, inline: true  },
                      { name: 'Queue', value: `**${queue[1]}**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#40f58e')
                   message.channel.send({embeds: [embed]})
                  }else{
                    const embed = new EmbedBuilder()
                    .setTitle('<a:online:1272085401741430888>    Online')
                    .addFields(
                      { name: 'Players', value: `**${data.clients}/${data.sv_maxclients}**`, inline: true  },
                      { name: 'Queue', value: `**0**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#40f58e')
                   message.channel.send({embeds: [embed]})
                  }
              
                  }catch(e){
                    const embed = new EmbedBuilder()
                    .setTitle('<a:offline:1272085724761423937>     Offline')
                    .addFields(
                      { name: 'Players', value: `**Offline**`, inline: true  },
                      { name: 'Queue', value: `**Offline**`, inline: true }
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true }))
                    .setColor('#ff0000')
                   message.channel.send({embeds: [embed]})
                  }
                }
                
              })

              client.on('messageCreate',async message => {
                if(message.content === '!ip'){
               
                const embed = new EmbedBuilder()
                .setColor('#13e3ee')
                .setDescription(`\`\`\`Connect ${ip} \`\`\``)
                message.channel.send({embeds: [embed]})
                  

                }
              })
              client.on('messageCreate',async message => {
                if(message.content === '!clear_activity'){
                   if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                  let wres = db.all().map(entry => entry.ID).filter(id => id.startsWith(`lepta_${message.guild.id}`))
                  await wres.forEach(await db.delete)
                  let wres2 = db.all().map(entry => entry.ID).filter(id => id.startsWith(`wress_${message.guild.id}`))
                  await wres2.forEach(await db.delete)
               }
                }
              })

              client.on('messageCreate',async message => {
                if(message.content === '!developer'){
               
                const embed = new EmbedBuilder()
                .setColor('#13e3ee')
                .setDescription(`\`\`\`By Makaros Dev👻\`\`\``)
                message.channel.send({embeds: [embed]})
                  

                }
              })






const membersChannelId = '1231702946128072804'; // Members Voice Channel
const boostsChannelId = '1231703118530482216' // Boosts voice channel
const serverId = '1228303544621465671' // Server ID

client.on("ready", () => {

    try {
      if (membersChannelId) {
        const total = client.channels.cache.get(membersChannelId)
        if (total) {
          setInterval(() => {
            total.setName(`🕺Members: ${client.guilds.cache.get(serverId).memberCount}`).catch(() => { });
          }, 60000)
        }
      }
      if (boostsChannelId) {
        const total = client.channels.cache.get(boostsChannelId)
        if (total) {
          setInterval(() => { 
            total.setName(`🚀Boosts: ${client.guilds.cache.get(serverId).premiumSubscriptionCount}`).catch(() => { });
          }, 60000)
        }
      }
      
    } catch (error) {
      return;
    }
})








const logChannelId = '1053619044235890717';
const timeLimit = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

client.on('guildMemberAdd', async (member) => {
  console.log('New member added:', member.user.tag);
  const logs = member.guild.channels.cache.get(logChannelId);
  if (!logs) return console.error('Log channel not found');

  if (Date.now() - member.user.createdTimestamp < timeLimit) {
    const embed = new EmbedBuilder()
      .setTitle("**Anti Alt System**")
      .setDescription(`**🆘 Εντοπίστηκε νέος Alt λογαριασμός. 🆘\n\nΌνομα : ${member.user.tag}\n\nID : ${member.id}\n\nΔημιουργήθηκε στις : ${moment(member.user.createdAt).format("MMM Do YYYY")}**`)
      .setColor("#df1a1a")
      .setTimestamp();

    const button = new ButtonBuilder()
      .setCustomId("kick_alt")
      .setLabel("Kick")
      .setStyle(ButtonStyle.Danger)
      .setEmoji('🦵');

    const row = new ActionRowBuilder()
      .addComponents(button);

    const msg = await logs.send({ embeds: [embed], components: [row] });
    console.log('Sent message with button:', msg.id);
    db.set(`${msg.id}_${member.id}_alt`, true);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  console.log('Button interaction detected:', interaction.customId);
  if (interaction.customId === 'kick_alt') {
    const member = interaction.guild.members.cache.get(interaction.message.embeds[0].description.split('\n')[4].split(': ')[1]);
    const isAlt = db.get(`${interaction.message.id}_${member.id}_alt`);
    if (isAlt) {
      const kickedEmbed = new EmbedBuilder()
        .setTitle("**Anti Alt System**")
        .setDescription(`**🆘 Εντοπίστηκε νέος Alt λογαριασμός. 🆘\n\nΌνομα : ${member.user}\n\nID : ${member.id}\n\nΔημιουργήθηκε στις : ${moment(member.user.createdAt).format("MMM Do YYYY")}\n\nΟ Alt λογαριασμός έγινε kicked από τον/την ${interaction.member}**`)
        .setColor("#df1a1a")
        .setTimestamp();

      const disabledButton = new ButtonBuilder()
        .setCustomId("disabled")
        .setLabel("Kick")
        .setStyle(ButtonStyle.Danger)
        .setEmoji('🦵')
        .setDisabled(true);

      const disabledRow = new ActionRowBuilder()
        .addComponents(disabledButton);

      await interaction.update({ embeds: [kickedEmbed], components: [disabledRow] });
      await member.send(`**Έγινες kick από τον ${interaction.guild.name}, επειδή είσαι Alt λογαριασμός.**`).catch(() => {});
      await member.kick('Alt Account');
      console.log(`Kicked member: ${member.user.tag}`);
    }
  }
});
              
              


              client.on("messageCreate", message => {

                if (message.content.startsWith(prefix + 'dmall')) {
                  message.delete
                  args = message.content.split(" ").slice(1);
                  var argresult = args.join(' ');
              
                  message.guild.members.cache.forEach(member => {
                    member.send(argresult).then(console.log(`[+] ${member.user.username}#${member.user.discriminator}`)).catch(e => console.error(`[-] ${member.user.username}#${member.user.discriminator}`));
                  })
                  console.log(`✅`)
              
                }
              
              })
              
              
              
              client.on('message', async (message) => {
                if (message.content.startsWith(`${prefix}e`)) {
                  // Diagrafei to minima pou kalesate to command
                  await message.delete();
              
                  // Kanei mention @everyone se oles tis rotes sto server
                  message.channel.send('@everyone');
                  await message.delete();
              
                  // Afise ena xroniko diastima gia na diagrafei to mention @everyone
                  setTimeout(() => {
                    message.delete();
                  }, 120000000); // To diagrafei meta apo 2 deuterolepta (allakse to xrono an theleis)
                }
              });
              


              const channellogs = '1053619044235890714';

              //channel create
              client.on("channelCreate", async function(channel) {
                try {
                  const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: 10 }); // Use integer value 10 for CHANNEL_CREATE
                  const log = logs.entries.first();
                  if (!log) return;
              
                  const embed = new EmbedBuilder()
                    .setTitle("📝Channel Created")
                    .setColor("#25f905")
                    .setDescription(`Από τον/την : <@!${log.executor.id}>\nΚανάλι : <#${channel.id}>\nΕίδος : ${channel.type}\nΌνομα : ${channel.name}`)
                    .setTimestamp()
                    .setFooter({ text: `ID : ${channel.id}` });
              
                  client.channels.cache.get(channellogs).send({ embeds: [embed] });
                } catch (error) {
                  console.error('Error fetching channel create logs:', error);
                }
              });
              
              //channel delete
              client.on("channelDelete", async function(channel) {
                try {
                  const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: 12 }); // Use integer value 12 for CHANNEL_DELETE
                  const log = logs.entries.first();
                  if (!log) return;
              
                  const embed = new EmbedBuilder()
                    .setTitle("❌Channel Deleted")
                    .setColor("#df1a1a")
                    .setDescription(`Από τον/την : <@!${log.executor.id}>\nΚανάλι : <#${channel.id}>\nΕίδος : ${channel.type}\nΌνομα : ${channel.name}`)
                    .setTimestamp()
                    .setFooter({ text: `ID : ${channel.id}` });
              
                  client.channels.cache.get(channellogs).send({ embeds: [embed] });
                } catch (error) {
                  console.error('Error fetching channel delete logs:', error);
                }
              });

              



              ////// Role Create-Delete Logs \\\\\\
              
const rolelogs = '1053619044235890711';

client.on("roleCreate", async (role) => {
  try {
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 30, // ROLE_CREATE action type as an integer
    });

    const roleCreateLog = fetchedLogs.entries.first();
    if (!roleCreateLog) return;

    const { executor, target, reason } = roleCreateLog;
    const embed = new EmbedBuilder()
      .setColor("#25f905")
      .setAuthor({ name: executor.username, iconURL: executor.displayAvatarURL(), url: `https://discord.com/users/${executor.id}` })
      .setDescription("✅A new role was created!")
      .addFields(
        { name: "User", value: executor.username, inline: true },
        { name: "Role Name", value: target.name, inline: true },
        { name: "Role ID", value: target.id, inline: true },
        { name: "Reason", value: reason || 'No reason provided', inline: true }
      )
      .setTimestamp();

    const logChannel = client.channels.cache.get(rolelogs);
    if (logChannel) {
      logChannel.send({ embeds: [embed] }).catch(console.error);
    }
  } catch (error) {
    console.error('Error logging role creation:', error);
  }
});

client.on("roleDelete", async (role) => {
  try {
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: 32, // ROLE_DELETE action type as an integer
    });

    const roleDeleteLog = fetchedLogs.entries.first();
    if (!roleDeleteLog) return;

    const { executor, reason } = roleDeleteLog;
    const embed = new EmbedBuilder()
      .setColor("#df1a1a")
      .setAuthor({ name: executor.username, iconURL: executor.displayAvatarURL(), url: `https://discord.com/users/${executor.id}` })
      .setDescription("❌A role was deleted!")
      .addFields(
        { name: "User", value: executor.username, inline: true },
        { name: "Role Name", value: role.name, inline: true },
        { name: "Role ID", value: role.id, inline: true },
        { name: "Reason", value: reason || 'No reason provided', inline: true }
      )
      .setTimestamp();

    const logChannel = client.channels.cache.get(rolelogs);
    if (logChannel) {
      logChannel.send({ embeds: [embed] }).catch(console.error);
    }
  } catch (error) {
    console.error('Error logging role deletion:', error);
  }
});





/// purge/ clear///
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
      if(message.content.startsWith('!purge') || message.content.startsWith('!clear')){
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**You do not have permissions.**")
              const content = args.join(' ');
              if(!content) return message.channel.send("How many messages do you want to delete ?")
              message.channel.bulkDelete(content).catch(e => {message.channel.send('You can not delete so old messages.')})

      }
  })





  ///steal emoji

  
  client.on('messageCreate', async message => {
    if (message.content.startsWith('!stealemoji')) {
      const args = message.content.split(' ');
      const emoji = args[1];
      const name = args[2];
  
      if (!emoji || !name) {
        return message.reply('Πρέπει να δώσετε ένα emoji και ένα όνομα. Χρήση: `!stealemoji <emoji> <name>`');
      }
  
      const emojiId = emoji.match(/\d+/g)[0];
  
      if (!emojiId) {
        return message.reply('Μη έγκυρη μορφή emoji.');
      }
  
      const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
  
      try {
        const createdEmoji = await message.guild.emojis.create({
          attachment: emojiURL,
          name: name,
          reason: `Ζητήθηκε από ${message.author.tag}`
        });
  
        message.reply(`Emoji ${createdEmoji} δημιουργήθηκε με το όνομα "${name}"`);
      } catch (error) {
        console.error(error);
        message.reply('Η δημιουργία του emoji απέτυχε. Βεβαιωθείτε ότι το bot έχει το `Manage Emojis` permission.');
      }
    }
  });



  ///anti spam 

  const spamDetectionThreshold = 5; // Messages per minute threshold
  const muteDuration = 60000; // 1 minute in milliseconds
  
  // Map to store message timestamps by user
  const userMessageTimestamps = new Map();
  
  // Map to store muted users
  const mutedUsers = new Set();
  
  client.on('messageCreate', async (message) => {
      if (message.author.bot) return; // Ignore messages from bots
  
      const now = Date.now();
      const userId = message.author.id;
      let userTimestamps = userMessageTimestamps.get(userId) || [];
      userTimestamps = userTimestamps.filter(timestamp => now - timestamp < 60000); // Clear old timestamps
      userTimestamps.push(now);
  
      userMessageTimestamps.set(userId, userTimestamps);
  
      if (userTimestamps.length > spamDetectionThreshold) {
          if (!mutedUsers.has(userId)) {
              mutedUsers.add(userId);
  
              const muteRoleId = '1053619043694825538'; // Replace with your mute role ID
              const member = message.guild.members.cache.get(userId);
              if (member) {
                  await member.roles.add(muteRoleId);
  
                  // Log the incident
                  const logChannel = message.guild.channels.cache.get('1053619044462370856'); // Replace with your log channel ID
                  if (logChannel) {
                      const embed = new EmbedBuilder()
                          .setTitle('User Muted for Spamming')
                          .setDescription(`${message.author.tag} has been muted for spamming.`)
                          .addFields(
                              { name: 'User ID', value: message.author.id, inline: true },
                              { name: 'Channel', value: message.channel.name, inline: true }
                          )
                          .setTimestamp()
                          .setColor('#ff0000');
  
                      logChannel.send({ embeds: [embed] });
                  }
  
                  // Unmute the user after the mute duration
                  setTimeout(async () => {
                      await member.roles.remove(muteRoleId);
                      mutedUsers.delete(userId);
  
                      if (logChannel) {
                          const embed = new EmbedBuilder()
                              .setTitle('User Unmuted')
                              .setDescription(`${message.author.tag} has been unmuted.`)
                              .addFields(
                                  { name: 'User ID', value: message.author.id, inline: true },
                                  { name: 'Channel', value: message.channel.name, inline: true }
                              )
                              .setTimestamp()
                              .setColor('#17a10e');
  
                          logChannel.send({ embeds: [embed] });
                      }
                  }, muteDuration);
              }
          }
      }
  });
  
  

  const membersChannelId1 = '1269990158065864714'; // Members Voice Channel
  const boostsChannelId1 = '1269990169319178354'; // Boosts voice channel
  const serverId1 = '1053619043694825533'; // Server ID
  const dateChannelId1 = '1272643592040616090'; // Channel to update with current date
  
  client.on("ready", () => {
      try {
          if (membersChannelId1) {
              const totalMembersChannel = client.channels.cache.get(membersChannelId1);
              if (totalMembersChannel) {
                  setInterval(() => {
                      totalMembersChannel.setName(`🕺Members: ${client.guilds.cache.get(serverId1).memberCount}`).catch(() => { });
                  }, 60000);
              }
          }
  
      
  
          if (boostsChannelId1) {
              const totalBoostsChannel = client.channels.cache.get(boostsChannelId1);
              if (totalBoostsChannel) {
                  setInterval(() => {
                      totalBoostsChannel.setName(`🚀Boosts: ${client.guilds.cache.get(serverId1).premiumSubscriptionCount}`).catch(() => { });
                  }, 60000);
              }
          }
  
          if (dateChannelId1) {
              const updateDateChannel = () => {
                  const dateChannel = client.channels.cache.get(dateChannelId1);
                  if (dateChannel) {
                      const daysOfWeek = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
                      const monthsOfYear = [
                          "Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου",
                          "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"
                      ];
                      const now = new Date();
                      const dayName = daysOfWeek[now.getDay()];
                      const day = now.getDate();
                      const monthName = monthsOfYear[now.getMonth()];
                      const formattedDate = `${dayName} ${day} ${monthName}`;
  
                      console.log(`Updating date channel with: ${formattedDate}`); // Debug log
  
                      dateChannel.setName(`📅 Date: ${formattedDate}`)
                          .then(() => console.log('Date channel name updated successfully'))
                          .catch(error => console.error('Error updating date channel name:', error));
                  } else {
                      console.error('Date channel not found');
                  }
              };
  
              // Initial update
              updateDateChannel();
  
              // Update every 24 hours
              setInterval(updateDateChannel, 86400000); // 24 hours in milliseconds
          }
      } catch (error) {
          console.error("An error occurred:", error);
      }
  });
   

  
const LOG_CHANNEL_ID = '1272644395904139364'; // Replace with your log channel ID

client.on('messageReactionAdd', async (reaction, user) => {
  // Check if the reaction is partially loaded (not cached)
  if (reaction.partial) {
      try {
          await reaction.fetch();
      } catch (error) {
          console.error('Something went wrong when fetching the reaction:', error);
          return;
      }
  }

  const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!logChannel) {
      console.error(`Log channel with ID ${LOG_CHANNEL_ID} not found.`);
      return;
  }

  const message = reaction.message;
  const channel = message.channel;
  const guild = channel.guild;

  const embed = new EmbedBuilder()
      .setTitle('Reaction Added Log')
      .addFields(
          { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
          { name: 'Channel', value: `${channel.name} (${channel.id})`, inline: true },
          { name: 'Message Content', value: message.content || 'No content' },
          { name: 'Emoji', value: reaction.emoji.name, inline: true },
          { name: 'User Reacted', value: `<@${user.id}>`, inline: true },
          { name: 'Date', value: new Date().toLocaleString(), inline: true }
      )
      .setColor('#00FF00') // You can set any color you like
      .setTimestamp();

  logChannel.send({ embeds: [embed] }).catch(console.error);
});




const logChannelId1 = '1272644395904139364';

client.on('emojiCreate', async (emoji) => {
  try {
      const logChannel = await client.channels.fetch(logChannelId1);
      if (!logChannel) {
          console.error('Log channel not found!');
          return;
      }

      // Placeholder for the user who added the emoji
      const addedByUserTag = 'user tag'; // Replace with actual user info if you have a way to track it

      const embed = new EmbedBuilder()
          .setTitle('Emoji Logs')
          .setColor('#00FF00') // You can set any color you like
          .addFields(
              { name: 'Action', value: '✅ Emoji Add', inline: true },
              { name: 'Added By', value: addedByUserTag, inline: true }, // Placeholder for user tag
              { name: 'Emoji', value: emoji.toString(), inline: true },
              { name: 'Emoji Name', value: emoji.name, inline: true }
          )
          .setTimestamp();

      await logChannel.send({ embeds: [embed] });
  } catch (error) {
      console.error('Error fetching the log channel:', error);
  }
});




  ///anti kakes lexis



  const channelId = '1272644395904139364'; // Replace with your channel ID

  client.on('messageCreate', message => {
    const forbiddenPhrases = [
        'Se GAMAW',
        'GAMO TIN MANA SOU',
        'gamo tin mana tou',
        'gamo tin mana sou',
        'Nekri na th breis',
        'sou gamaw tin mana',
        'sou gamao thn mana',
        'na sou pe8anei',
        'NA SOU PE8ANEI',
        'NA SE BROUN NEKRO',
        'na se broun nekro',
        'mpastarde',
        'MPASTARDE',
        'SOU GAMO TIN MANA SOU',
        'sou gamo tin mana sou',
        'SOU GAMAW TIN MANA',
        'SOU GAMAO THN MANA',
        'gamw tin mana tou',
        'gamw tin mana sou',
        'gamw tn mana sou',
        'gamw thn mana sou',
        'gamw thn mana sou thn poutsozytiana',
        'fuck you',
        'ante re arxidi',
        'arxidi',
        'skase mhn se gamhsw',
        'gamhsw',
        'BASTARDO',
        'Tis manas sou',
        'mama kala',
        'mama sou',
        'ths mana sou to mouni',
        'na sou pethanei h mana',
        'gamw ton patera sou',
        'mpastardo',
        'poutanas gie',
        'gamw oti agapas',
        'na sou pethanei',
        'moule',
        'gamwmane',
        'apatere',
        'gamw thn panagia sou',
        'gamw ton xristo sou',
        'gamw thn panagia'
    ];
  
    if (forbiddenPhrases.some(phrase => message.content.toLowerCase().includes(phrase.toLowerCase()))) {
        const deletedBy = message.author; // Get the User object of the user who sent the message
        const deletedContent = message.content; // Get the content of the deleted message
        message.delete()
            .then(() => {
                console.log(`Deleted message from ${deletedBy.tag}: ${deletedContent}`);
                sendNotification(message, deletedBy, deletedContent);
                sendDM(deletedBy);
            })
            .catch(console.error);
    }
  });
  
  function sendNotification(message, deletedBy, deletedContent) {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return console.error('Invalid channel ID.');
  
    const embed = new EmbedBuilder()
        .setTitle('Message Deleted')
        .setDescription(`A message containing forbidden phrases was deleted. Sent by: ${deletedBy.toString()} (${deletedBy.tag})`)
        
    channel.send({ embeds: [embed] })
        .then(() => console.log('Notification sent to the channel.'))
        .catch(console.error);
  }
  
  function sendDM(user) {
    user.send('Μην βριζεις κακο παιδι')
        .then(() => console.log(`Sent DM to ${user.tag}`))
        .catch(console.error);
  }




  ///Security



const banThreshold = 3; // Set the threshold for banning users
const banCounts = new Map(); // To keep track of bans performed by each user
const kickThreshold = 3; // Set the threshold for kicks
const kickCounts = new Map(); // To keep track of kicks performed by each user
const notifyChannelId = '1272647820616142921'; // Replace with your channel ID
const whitelistRoleId = '1272647606169763963'; // Replace with your whitelist role ID

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildBanAdd', async (ban) => {
    const auditLogs = await ban.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberBanAdd,
        limit: 1
    });
    const banLog = auditLogs.entries.first();

    if (!banLog) return;

    const { executor, target } = banLog;
    if (!executor || target.id !== ban.user.id) return;

    const userId = executor.id;

    // Check if the executor has the whitelist role
    const executorMember = await ban.guild.members.fetch(userId);
    if (executorMember.roles.cache.has(whitelistRoleId)) return;

    // Update ban count
    let count = banCounts.get(userId) || 0;
    count += 1;
    banCounts.set(userId, count);

    // Check if the user has reached the threshold
    if (count >= banThreshold) {
        try {
            const guild = ban.guild;
            const user = await guild.members.fetch(userId);
            await user.ban({ reason: `Banned ${banThreshold} or more members` });

            // Send an embed message to the specified channel
            const notifyChannel = await client.channels.fetch(notifyChannelId);
            if (notifyChannel && notifyChannel.isTextBased()) {
                const embed = new EmbedBuilder()
                    .setTitle('User Banned')
                    .setColor(0xff0000)
                    .addFields(
                        { name: 'User', value: `${executor.tag}`, inline: true },
                        { name: 'Reason', value: `Banned ${banThreshold} or more members`, inline: true }
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/1192126987276390442/1269235670363279443/IMG_1257.jpg?ex=66af5355&is=66ae01d5&hm=b9e14cf59ee16ddbf551dedabab671b95b97958c4598ddd6379ead2b4824ad39&')
                    .setTimestamp();
                notifyChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(`Failed to ban user ${executor.tag}:`, error);
        }

        // Reset the ban count
        banCounts.delete(userId);
    }
});

client.on('guildMemberRemove', async (member) => {
    const auditLogs = await member.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberKick,
        limit: 1
    });
    const kickLog = auditLogs.entries.first();

    if (!kickLog) return;

    const { executor, target } = kickLog;
    if (!executor || target.id !== member.id) return;

    const userId = executor.id;

    // Check if the executor has the whitelist role
    const executorMember = await member.guild.members.fetch(userId);
    if (executorMember.roles.cache.has(whitelistRoleId)) return;

    // Update kick count
    let count = kickCounts.get(userId) || 0;
    count += 1;
    kickCounts.set(userId, count);

    // Check if the user has reached the threshold
    if (count >= kickThreshold) {
        try {
            const guild = member.guild;
            const user = await guild.members.fetch(userId);
            await user.ban({ reason: `Kicked ${kickThreshold} or more members` });

            // Send an embed message to the specified channel
            const notifyChannel = await client.channels.fetch(notifyChannelId);
            if (notifyChannel && notifyChannel.isTextBased()) {
                const embed = new EmbedBuilder()
                    .setTitle('User Banned')
                    .setColor(0xff0000)
                    .addFields(
                        { name: 'User', value: `${executor.tag}`, inline: true },
                        { name: 'Reason', value: `Kicked ${kickThreshold} or more members`, inline: true }
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/1192126987276390442/1269235670363279443/IMG_1257.jpg?ex=66af5355&is=66ae01d5&hm=b9e14cf59ee16ddbf551dedabab671b95b97958c4598ddd6379ead2b4824ad39&')
                    .setTimestamp();
                notifyChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(`Failed to ban user ${executor.tag}:`, error);
        }

        // Reset the kick count
        kickCounts.delete(userId);
    }
});

client.login(info.token)


