---
title: "Breaking down the Single Responsibility Principle"
date: "2020-01-01"
slug: "breaking-down-the-single-responsibility-principle"
image: "image.jpg"
thumbnail: "thumbnail.jpg"
excerpt: "SRP"
isDraft: true
---
The Single Responsibility Principle, also known as SRP, is often taken for granted due to its apparent simplicity. *You just need to make stuff do one thing and do it good!* And while that statement is in fact correct, in practice it's quite hard to actually apply it properly. Questions like what exactly **is** the stuff that needs to do one thing, what is **"one thing"** and how is the stuff supposed to **"do it good"** come to to mind more often than not.

When our beloved [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin) popularized the SRP back in the early 2000's (a bit more on that [here](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)), he came with a great statement to try to make it a bit easier for us, where he says that **each software module should have one and only one reason to change**. That makes things a bit better. Now we know that a software module should be responsible for one thing and should only have one reason to change. But that still leaves us with some of those questions unanswered, so lets break that down a bit more and make it a bit more didactic.

## The bike problem

When I was younger I had one of those bikes which you can pedal forwards to accelerate it and backwards to stop it. You can already see that we have one thing here (the pedals) with multiple responsibilities (accelerating and braking), but let's not think about that for now, everything worked fine so all is good.

One day I had the wonderful idea to tinker with my bike to make it move faster, so I made some changes in its gears and chains and went to test it after I was done. I can tell you boy, that worked greatly, the bike could go twice as fast now and I was flying on it. Total success. So when I finished testing it's big new feature I tried to stop it by pedaling back, and to my big surprise the brakes were not working quite as expected which lead me to a small accident.

After some scratches and small wounds, I realized that my changes on those gears and chain directly affected the ability of the bike to brake. But that doesn't make any sense if you really think about it. Why would changes in the way the bike accelerates cause problems in in the way it brakes? That's not a reason for the brakes to change at all.

I would actually expect the bike **acceleration** to be completely broken to be honest, that would make a hell lot of more sense given my bike tinkering skills, but never the brakes. I would expect the brakes to stop working if I was, well... **tinkering with the brakes**, trying to maybe make them softer or whatever.

And that gives us a very good view on the whole problem here. **The acceleration and brakes of the bike were too tightly coupled**. Changes in any of them could directly affect both in unpredictable ways since they were part of the same thing, the same module. **There was no separation of concerns**.

I must say it was probably very convenient at one point for the guys who built that bike. They probably thought something like "hey wait a minute, we don't really need a brake system if we can just base the direction the wheels move on the direction the pedals move, so you just move back when you want to brake". But what they didn't think is that someone like me would go there and change the gears and chain in a way they completely didn't expect, causing the whole brake system to fall apart while the rest of the bike still worked fine.

With that I hope the concepts of coupling and separation of concerns were made clear, how they can cause big problems and how it's easy to not really think about them when designing something.

## The solution to the bike problem

Now imagine what's next for the bike creators. They realized their brake solution sucks hard. It's not really reliable, it's not safe, it's hard to brake at high velocities and it has a hard maintenance. So they want to change to a more modern approach.

The more modern approach of course would be to have a brake handle available to your hand which would physically create friction with the wheel based on how hard you press that handle. It solves all the problems. But now in order to implement this solution they have to completely remake the building process of the pedals since it won't work the same way anymore, they also have to attach a brake handle to the handlebar while crossing a fiber cable through one end of the bike to the other, and finally they have to integrate this physical brake to the wheel.

Oh gosh those guys must hate me for tinkering with my bike now. That looks like a lot of changes and a lot of work. Changes in stuff that was working properly but now will all have to be retested and proved to work properly again. Changes that could have been avoided if they hadn't solidified their process with such unthought couplings. Imagine how many things can and will go wrong now until they make it right.

You can probably already see the similarities of this bike problem with the ones we face on software development, right? You can probably relate to it because most developers have been through this exact same problem in the past.

You have to deliver something, you don't think about the reasons for some modules to change so you assume they won't change and end up coupling them with other modules. Now one of those things decides to change for different reasons and you'll have a hard time doing so because everything is tangled up together using the same state and being used as dependency to other modules. Then you'll either make it an even bigger mess or have to rewrite the whole thing.

So how can we foresee those problems and finally make sense of this goddamn principle? Let's first leave the bike high abstraction and face a more real software problem to see how we can approach it.

## The ... problem
