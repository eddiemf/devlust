---
title: 'Breaking down the Single Responsibility Principle'
date: '2020-01-18'
slug: 'breaking-down-srp'
excerpt: "Making sense out of the single responsibility principle is not as simple as it can seem, so in this post we'll completely break it down so that we can fully understand it and know how it can help us create cleaner and more decoupled code."
isDraft: false
---

The Single Responsibility Principle, also known as SRP, is often taken for granted due to its apparent simplicity. _You just need to make stuff do one thing and do it properly!_ And while that statement is in fact correct, in practice it's quite hard to actually apply it properly. Questions like what exactly **is** the stuff that needs to do one thing, what is it to **"do one thing"** and what does it mean to **"do it properly"** come to mind more often than not.

When our beloved [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin) popularized the SRP back in the early 2000's, he came with a great statement to try to make it a bit easier for us, where [he says](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) that **each software module should have one and only one reason to change**. So with that statement in mind let's completely break down this principle so that we can finally understand its true purpose and why it's so important.

## The bike problem

When I was younger I had one of those bikes which you can pedal forwards to accelerate it and backwards to stop it. One day I had the wonderful idea to tinker with it to try to make it move faster, so I made some changes in its gears and chains and went to test it after I was done.

I can tell you boy... that worked greatly! The bike could go a lot faster now and I was flying on it. Total success. So when I finished testing its big new feature I tried to stop it by pedaling back, and to my big surprise the back pedaling wasn't working quite as expected and the bike wouldn't stop properly, leading me to a nice high velocity hug on a tree.

After such a lovely hug, I realized that my changes on those gears and chain directly affected the ability of the bike to brake by pedaling back. And well, that kinda makes sense given that they're all together using the same components to do different things, but if I would had just told you without any details that after tinkering with my bike's gears and chain its brakes stopped working, you would probably be like **wtf**. Why would changes in the way the bike accelerates cause problems in the way it brakes? That doesn't make any sense at all.

And that gives us a very good view on the whole problem here. **The acceleration and brakes of the bike were too tightly coupled**. Changes in any of them could directly affect both in unpredictable ways since they were part of the same thing sharing the same resources. The same module but with different purposes and reasons to change. **There was no separation of concerns**.

You can imagine that when the people who designed that bike were doing their job, they probably didn't give much attention to the way the bike brakes. They had a simple solution that worked but they failed to realize that the brake was an important detail which was **very likely to change for different reasons than the acceleration**.

Having a simple "back pedaling brake" system wouldn't be ideal on higher velocities, and trying to make it ideal inside of the pedaling module would always be limited and difficult. So it should have been crucial for them to have found those concerns and thus separating the brakes from the pedals, and that's where the design failed.

But now that we understand the concepts of coupling and separation of concerns, and we also know exactly where is the problem, it should be quite simple to fix it, right? Well, not quite. Failing to address this kind of issue early on will most likely lead you to a lot of problems later when you realize that you did it wrong. So let's try and do that to see how bad it can go.

## Trying to fix the problem

Imagine now what's next for the bike designers. They've realized that their current brake solution sucks hard. It's not really reliable on higher velocities, it's not safe and it has a hard maintenance. So they want to extract it out of the pedaling module to have more control over it. They want to create a completely decoupled brake module. And so they start it.

After thinking about it they come to the conclusion that they should integrate a brake handle in the handlebar which would physically create friction with the wheel based on how hard you press that handle with your fingers.

Brilliant, it solves all the problems!

But now in order to implement this solution they will have to go through a hard path. The pedals won't work the same way anymore, the brake handle needs to be somehow attached to the handlebar while crossing a fiber cable through one end of the bike to the other, and finally a physical brake needs to be integrated to the wheel.

All of these changes can prove to be quite challenging to implement after the whole bike is already designed. Imagine that in order to attach this handle to the handlebar we'll need to make them both compatible. The same thing to cross the wire through the frame, creating new holes, changing sizes and all sorts of things. And what if the wheels were already too wide because they weren't expecting it to have some physical thing making friction against them to decelerate? Yeah they really might need to redesign the whole bike for that. Yikes.

That's definitely a lot of changes and a lot of work. Changes in things that were working properly but now will all have to be retested and proved to be working properly again. Changes that could have been avoided by realizing that the pedaling module was **responsible for two things that could change for different reasons**, acceleration and braking. Having this concept in mind is the key to avoid such problems.

---

But at this point you're probably already tired of this whole abstract bike problem that might not even be accurate in the bikers world because of course I've made it all up, and you want to see some real code example of this whole thing. So enough of that and let's do it!

## Leaving the abstraction and entering the code

As the software developer that you probably are, you can definitely see the similarities of this bike problem with the ones we face on software development, right? I know you can relate to it because most developers have been through this exact same problem in the past.

You have to build something and you don't really think about any reason for some things to be separated into different modules, so you end up coupling it all together. Now one of those things decides to change and you'll have a hard time doing so because everything is tangled up together using the same state, being used as dependency to other modules, and a lot more problems that will turn your change into a big nightmare. Then you'll either end up making an even bigger mess or rewriting the whole thing.

Take a look at this simplified `User` class taken from an e-commerce application.

```javascript
class User {
  public async getCartQuantity() {
    const db = await mySqlClient.openConnection();
    const count = await db.query('SELECT COUNT(*) FROM cart');

    return `Cart has (${count}) items`;
  }
}
```

At first you might think this `getCartQuantity` is a handy method. You can call it in the place where you're rendering the application and you don't even need to parse or do anything else, the data is perfectly handed to you. So let's add some requirements to make things more interesting!

The website owner asked the dev team to add a small warning message close to the cart whenever users come back in a new session and still have items inside of it, so that they can be aware of it and avoid problems with old sessions interfering with a new one.

In order to do that, the devs decide to create a `getCountWarning` method inside of the `Cart` class and use the `getCartQuantity` method from the `User` class to grab that data and display the proper message.

Hum.. but remember that `getCartQuantity` returns a message with the quantity inside of it, and they don't really want to touch the `User` class because it's managed by a different team in a separate codebase, so they're gonna have to parse the number out of it. And they end up creating the method as below.

```javascript
class Cart {
  public async getCountWarning() {
    const isNewSession = sessionManager.isNewSession();
    const countMessage = user.getCartQuantity();
    const count = +countMessage.split('(')[1].split(')')[0];
    if (isNewSession && count > 0) {
      return `Reminder: you still have ${count} items in your cart!`;
    } else {
      return null;
    }
  }
}
```

Jesus what a messy code, but it works perfectly and everyone is happy, yay!
That one was easy, so let's bring more changes because that's what applications do, they change!

The owner made some tests with some people and came to a conclusion that no one really likes those parentheses around the cart quantity, so he just tells the dev team to remove it. Easy change in the owner's mind. Easy change for the devs too, and so they do it.

At this point I want you to pay good attention to what is going on here. In the owner's mind, removing some parentheses from a text should be the simplest thing ever and should never cause any problems in the website. It's just a text detail!

And then the devs changed that small piece of code in the `User` class which, as we knew would happen, also broke the warning message feature. But it doesn't stop there just yet. I didn't tell you this but the frontend script that takes care of adding items to the cart was also relying on those parentheses to do its job, so it also broke with the new changes, which means that no one can add products to their carts, making it impossible to purchase anything in the whole website.

Holy cow, that's what I call a disaster. Imagine deploying this change on a Friday afternoon, huh? Yeah, I've been there, and probably a lot of you too.

Right now the owner is 100% sure he's working with people who have no idea what they're doing, people who completely lost control over their creation.

How can a simple change such as removing parentheses from a text cause basically the whole website to stop working? These devs are absolutely stupid is what he must be thinking.

So let's take a moment to see what went wrong and what can we do to fix this issue.

## Fixing the code problem

The devs very quickly realized that there were different parts of the code relying on that exact text they were returning from the `getCartQuantity` method in the `User` class, so they quickly put them back there so that the website can work properly again. But now how are they going to remove these parentheses without breaking it all again?

In order to do that, they'll have to finally change this method to return the actual number of items in the cart instead of the whole text with that information, separating the text formatting from the data manipulation.

But then they'll break the code in the `Cart` class which is parsing that text, so they'll have to change it there too. Oh but there's also the frontend script which will break when they remove the parentheses, so they have to change it once again. And at this point who knows if there's any other place relying on that specific piece of text in the whole website? Well, no one knows, and that's a big problem.

What should be a simple change to a simple text will probably end up taking weeks to be done until everything is fully tested and they're sure they can deploy it without breaking anything in the app.

But how could they have thought about this better when first writing that? How can you decide what should be together and what shouldn't? One could argue that it would be impossible to predict that the owner would want to change that text, so how could they have avoided this whole problem? Let's analyze it and try to find those answers.

## Analyzing the problem

Earlier in this article we learned that **we should keep things that change for different reasons separated from each other**, and that's exactly what this dev team missed here.

When developing the `getCartQuantity` method in the `User` class, they should have thought about the reasons for each line of code to change. So the moment they returned a formatted string from a method that is manipulating data, they should have thought that the format can change for various reasons like UI, accessibility, readability, etc. While the data manipulation could change because of changes in the database structure, in the business rules that decide what a cart item means, etc.

If they had thought about that, it would be easy to spot that there were two different concerns in this method, two different responsibilities. So measuring how potential changes to both could affect the system would be a lot easier and they would certainly have separated them at that point to avoid bigger problems in the future.

So you can see that even without knowing how exactly something will change we can still measure how a potential change would affect the whole system, and then choose to decouple it before everything is built on top of that decision.

And that's the whole idea behind the single responsibility principle and separation of concerns. They're meant to help us create loosely coupled units in our code, which then will allow us to easily have multiple teams working on different parts of a system, have independent deployability of those units, and most importantly give us a lot more confidence that simple changes in an isolated unit will not cause other isolated units to stop working.

## Conclusion

After completely breaking down these two different cases for the sake of this principle, I hope to have made it clear how tight coupling and no separation of concerns can create huge problems when designing any piece of code or even real objects such as that bike.

And by keeping things that change for different reasons apart from each other, we lower the coupling between them, making it a lot easier to change them without causing changes to different modules, keeping us away from all those nightmares that we saw in this article.

So the next time you write some code, always have in mind what could be the reasons for something to change. Is it design/UI related like a text or formatting? Is it business rule related like calculating prices or salaries? Or maybe it's something technical like using a SQL database instead of NoSQL? All of these could end up together in the same module if you don't think about these different reasons for them to change. So always remember that.

And with that I finish this article wishing you a happy decoupled coding! Have fun!
