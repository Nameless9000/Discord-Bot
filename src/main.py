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
collection = mongoClient["testing"]["users"]

#client
client = commands.Bot(command_prefix = os.getenv("PREFIX"))

#owners
owners = ["272476770127708160", "659140496895115287"]

#events
@client.event
async def on_ready():
    print("ready")

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
      embed.add_field(name="Uploads", value=x["uploads"])
      await ctx.send("check your dms")
      await ctx.message.author.send(embed=embed)
    else:
      await ctx.send("invalid user")
  else:
    await ctx.send("no perms")

#running
client.run(os.getenv("BOT_TOKEN"))