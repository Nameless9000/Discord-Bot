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
myclient = pymongo.MongoClient(os.getenv("MONGO_URI"))
mydb = myclient["fart"]
mycol = mydb["hello wrold"]


#client
client = commands.Bot(command_prefix = "!")

#events
@client.event
async def on_ready():
    print("ready")

#commands
@client.command()
async def lookup(ctx, *, username):
    x = mycol.find_one({ "name": str(username)})
    embed = discord.Embed(color=0xff0059)
    embed.add_field(name="Username", value=x["name"], inline=False)
    embed.add_field(name="Key", value=f"||{x['key']}||", inline=False)
    await ctx.message.author.send(embed=embed)

#running
client.run(os.getenv("BOT_TOKEN"))