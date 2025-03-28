// src/subpages/blogs/blog-content/blog1.tsx
import React from 'react';
import '../blog.css';
import { blogs } from '../blogs';
import { CodeBlock } from 'react-code-blocks';
import { myCustomTheme } from '../codeblocks.ts';

const Blog1: React.FC = () => {
  return (
    <div className="page">
      <div className="blog">
        <h1 className="blog-title">{blogs[0].title}</h1>
        <div className="blog-date">Posted on {blogs[0].date}</div>
        <div className="blog-content">
                <p>Where do people find their motivational source? Whether it's to simply go to the gym once a day at a specified time, or 
                    to work on something to further their lives? What about job searching? What motivates individuals to go out and explore 
                    the vast quantity of companies and find the ones that they'll stick with? Today I'll be going over both my personal quest 
                    for motivation, but also what passion does to ignite the flames. 
                </p>
                <p>Throughout my life, I have never really been motivated at anything in particular. I spent most of my youth playing video games 
                    and watching movies and tv shows. I understand that as a kid, maybe being in tune with the cultural norms are important, because 
                    that's where almost ALL kids are. If you wanted to make a new friend, you'd play some Modern Warfare 2 on your Xbox 360, join a 
                    group chat, and keep in contact with this newfound medium.  
                </p>
                <p>I honestly think the advent of technology and communication in the forms such as internet-connected gaming consoles and social media 
                    have given kids a dearth of personal inspiration. I'm not saying that kids need to be stuck in boredom and tinker with gadgets in 
                    order to find some sort of passion. That would be a boring childhood and that, mixed with the monotony of adult life, would lead you to 
                    probably not find an interest in anything. So how do people find that motivation? Is it only found in your youth? 
                </p>
                <p>Yes, and no. I think being a kid is important because you don't have that intense influx of information that you get when you're older. 
                    For example, news about climate change, wars, political ideologies, and technological advancements are all things that you 
                    are accustomed to seeing on the news as an adult but not as kids (unless you lost your innocence early). So if you don't find that motivation or passion 
                    in your life early on, then it'll become increasingly harder to find something that truly resonates with you (in this modern era).   
                </p>
                <p>I'll give a personal anecdote about my own passions: When I was a kid, I loved playing computer games a LOT. Everything from downloading 
                    suspicious files for a lesser-known MMORPG to playing browser games, it was all straight enjoyment and passion. So, naturally, as I aged 
                    to around 13-14, I began to think about how I could build my own computer to run all of these games. I knew nothing about the intricacies of 
                    computers (no idea what a bit was) and I certainly didn't know anything about software! 
                </p>
                <p>Still, with a broad picture of a computer and how it works, I began to find enjoyment in this field. I went on <a href="https://pcpartpicker.com/" style = {{
                    textDecoration: 'none', color: "white"
                }}>PCPartPicker</a> at least once a day to find some deals on GPUs that would be able to run my dream games. From there, I began to develop this passion 
                    for everything computers, to the point where I even went to college for Computer Science. However, as a kid, I viewed computers as these machines 
                    capable of playing the most enjoyable games and watching TV on illegal streaming websites. Really, what couldn't you do with it?  
                </p>
                <p>This motivation I had to understand this field began as a kid, and lost its flame within college. When I understood how software works, and how exactly 
                    updates are patched to video games, it began to feel like the "magic" that was computers was simply just a bundle of bits. I understood my motivation 
                    for wanting to learn computers is to find enjoyment in the things that computers offer, but there was no enjoyment in where I was. 
                </p>
                <p>Instead of having this motivation to tinker with computers and acquire this thirst for knowledge, I only found motivation in pursuing media and 
                    recreation. I say all of this because I want to stress the most important thing about finding motivation. I believe it's retaining your youth, 
                    and having this drive to <i><b>figure</b></i> something out. If I had a passion to understand computers as a kid, then today I would 
                    still have motivation to do the same, since the cyber-world is rapidly growing each month. Instead, I sought enjoyment from the activities offered 
                    from computers, and that led me to find temporary motivation, which was snuffed out once I <i>understood</i> how things worked. Now, I sit and 
                    critique video games if they have boring mechanics or if they don't have ray tracing enabled for optimal visual immersion. 
                </p>
                <p>To find motivation is to say: "Hey I want to better myself, let's start by illuminating this darkness called ignorance". Only when you understand 
                    that you know <i>nothing</i> and keep striving to learn more is when you have found motivation. Currently, I have motivation to learn all about 
                    history, language, and automation. I wake up and am driven to pursue my micro-goals in order to one day uncover a part of this ignorance and make it 
                    something known. If you claim you've understood everything about your passions, then is there any more motivation left? 
                </p>
                <p>A word of advice I'll give: don't get drawn into recreation as a means of optimal enjoyment. If you do, there will be no motivation to 
                    do any other task to further your life, and you'll be stuck being motivated by those things growing up as well. For example, you'll do everything in 
                    your life with minimal motivation in order to sit and lounge around (which becomes your motivation, funny enough). Having these interests develop 
                    throughout your life also gives you a means of communication with the people around you. My love for history can be shared with the people I talk to, 
                    which in turn provides a deeper understanding internally. 
                </p>
                <p>Motivation is a weapon that when wielded right, can have the power to change the entire world! Einstein's motivation to understand the known universe 
                    led him to develop multiple theories which are widely accepted today as the basis of Theoretical Physics. Aristotle's need to apply a universal 
                    mode of thought to every field led him to develop the idea of logic. So what is your motivation? If you don't have one, what is something you want 
                    to understand more and could devote micro-goals to understand it? 
                </p>
          <CodeBlock
            text='console.log("Hello world!");'
            language="javascript"
            showLineNumbers={true}
            theme={myCustomTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog1;
