#imports
from dotenv import load_dotenv
import pymongo
import discord
from discord.ext import commands
import json
import os

#env
load_dotenv()

#lookup
mongoClient = pymongo.MongoClient(os.getenv("MONGO_URI"))
collection = mongoClient["fart"]["hello wrold"]

#client
client = commands.Bot(command_prefix = os.getenv("PREFIX"))

#owners
owners = ["272476770127708160", "659140496895115287"]

#events
@client.event
async def on_ready():
    print("ready")

@client.event
async def on_message(message):
  if message.channel.id == 773023826292375592:
    emoji = "<:upvote:779040968875835392>"
    await message.add_reaction(emoji)
    emoji = "<:9975_downvote:779040968816066620>"
    await message.add_reaction(emoji)

#commands
@client.command()
async def lookup(ctx, *, username):
  if str(ctx.message.author.id) in owners:
    x = collection.find_one({ "username": str(username)})
    if x != None: 
      embed = discord.Embed(color=0xff0059)
      embed.title = "User Lookup"
      embed.add_field(name="Username", value=x["username"])
      embed.add_field(name="Key", value=f"||{x['key']}||")
      embed.add_field(name="Invited By", value=x["invitedBy"])
      embed.add_field(name="Blacklisted", value=x["blacklisted"]["status"])
      embed.add_field(name="Invite", value=f"||{x['invite']}||")
      embed.add_field(name="Registration Date", value=x["registrationDate"])
      embed.add_field(name="Uploads", value=x["uploads"])
      embed.add_field(name="Domain", value=x["domain"]["subdomain"] + "." + x["settings"]["domain"]["name"] if x["settings"]["domain"]["subdomain"] != None and x["settings"]["domain"]["subdomain"] != "" else x["settings"]["domain"]["name"])
      embed.add_field(name="Admin", value=True if "admin" in x["roles"] else False)
      await ctx.send("check your dms") if str(ctx.message.channel.type) == "text" else None
      await ctx.message.author.send(embed=embed)
    else:
      await ctx.send("invalid user") 
  else:
    await ctx.send("you no have perms")

@client.command()
async def blacklist(ctx, *, username):
  if str(ctx.message.author.id) in owners:
    x = collection.find_one({ "username": str(username)})
    if x != None:
      querey = { "username": "username"}
      newquerey = { ""}
      x.update_one()
      embed = discord.Embed(color=0xff0059)
      embed.title = "Blacklist"
      embed.add_field(name="Success", value=f"Successfully blacklisted {username}.")
      await ctx.send(embed=embed) if str(ctx.message.channel.type) == "text" else None
    else:
      await ctx.send("invalid user")
  else:
    await ctx.send("you have no perms")

@client.command()
async def giveinvites(ctx, amount, *, username):
  if str(ctx.message.author.id) in owners:
    print(username)
    if str(username) == "everyone":
      for x in collection.find():
        invites = x["invites"]
        collection.find_one_and_update({ "invites": invites + int(amount)})
    else:
      x = collection.find_one({ "username": str(username)})
      if x != None:
        invites = x["invites"]
        collection.find_one_and_update({ "username": str(username)}, { "$set": { "invites": invites + int(amount)}})
        await ctx.send(f"given {username} {amount} invite(s)")
      else:
        await ctx.send("invalid user")
  else:
    await ctx.send("you have no perms")


#running
client.run(os.getenv("BOT_TOKEN"))