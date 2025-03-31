// src/subpages/blogs/blog-content/blog1.tsx
import React from 'react';
import '../blog.css';
import { blogs } from '../blogs';

const Blog3: React.FC = () => {
  return (
    <div className="page">
      <div className="blog">
        <h1 className="blog-title">{blogs[2].title}</h1>
        <div className="blog-date">Posted on {blogs[2].date}</div>
        <div className="blog-content">
                <h2>Introduction</h2>

                <p>I don't really understand what shifted in humans during the 2000s, but it is a cultural shift which I think we should probably talk about more often. 
                    The age of information brought about the notion that humans are capable of digesting information at a much quicker pace than was possible in the past. 
                    News about wars and other major events in the 1600s probably wasn't broadcasted live to the entire planet as it is nowadays. 
                    Actions happen as a result of the influx of information, so with this low latency information flow, response times to events are much quicker 
                    across the entire planet. While this may seem like a great thing, we forget that humans are capable of both good and evil. 
                    Usually, we tend to do evil when the repercussions are low/non-existent. 
                </p>
                <p>Increased information flow via the internet spurs responses from people globally. Tangible actions are usually more effective in the face of events, 
                    however, the sentiment of the people is actually just as important at times. A great example is every 4 years when the U.S president is decided. 
                    The sentiment of people on the internet towards each political party gives analysts a measure of the probability of success for each candidate. 
                    Social media accounts lay out polls asking users who they prefer, and those small responses aggregate into a superficial understanding of broader 
                    voter sentiment. So how is this just as important as tangible actions? It is because the human being is less focused on figuring things out for 
                    themselves, but rather being the sheep and following the herd. If all of my friends love Trump and are right-wing conservatives, then my beliefs will 
                    also slowly mimic theirs. However, if my friend group has an even distribution of various political beliefs, then I am probably less likely to mimic 
                    just the right-wing friends. Close relationships are more likely to influence you than strangers. However, what happens when we decide to slowly 
                    embrace the internet as extensions of ourselves?
                </p>

                <h2>Individualism</h2>

                <p>Humans are not as capable of making deep social connections as they used to be. Hospitality was a quality that was lauded by people in the past. 
                    If someone appears to be in pain in the old South, then I'd reckon a few civilians would take it upon themselves to assist, because they consider 
                    that as their duty to the broader community. A community is a wonderful way to bridge the differences between various people by allowing them to 
                    share experiences amongst each other. 
                </p>
                <p>Our modern age tries very hard to grasp this idea of a community, but we fall short. What is the barrier that keeps humans from developing 
                    self-organizing communities? I would attribute this short-coming to the growing lack of attention in humans nowadays. I ride the NYC subway on a 
                    daily basis. People that normally ride the subway probably don't see the merit in observing their surroundings (as it's probably the same sights 
                    you've seen every single day). However, to overcome this feeling of boredom, we tend to just go on our phones and force ourselves to find some 
                    amusement. Now this isn't a sure-fire way to say “Yes, this proves that humans are no longer social beings!”, however, it does speak volumes to the 
                    human desire to find happiness through dopamine stacking. 
                </p>
                <p>Dopamine stacking is a phrase I believe goes along with the idea of short term gratification. Humans no longer enjoy the idea of long term potential 
                    gains. No one is probably going to sit there and say that they would water a plant for 2 years before it finally achieves a glimpse of growth. 
                    They would be more excited if someone were to give them a miracle fertilizer which would make the tree grow in a week. I can extend this analogy to 
                    relationships too. Isn't it far better to simply swipe on 100 people in a dating app than to meet a person organically, go on a date with them, and 
                    then slowly attempt to build growth? Maybe not, but you'd be lying if you said you don't get a dopamine rush from swiping on multiple people and 
                    getting matches. 
                </p>
                <p>With this being said, isn't it a bit ridiculous that our brains have been wired to enjoy living life efficiently? We have tuned out the deeper 
                    understanding of things and turned our attention to the superficial nature of things. We've lost the ability to connect and build a community, and 
                    thus devolved into an individualist mindset. There's been huge impacts on our standard of living as a result, but the worst danger to the human 
                    species comes with the advent of apathy.
                </p>

                <h2>Apathy</h2>

                <p>The U.S military decides to invade Iraq post 9/11 to combat the threat of terrorism worldwide. Since this is during the age of information, the news about 
                    each battle spreads quick, with breaking news forecasts dominating headlines and informing civilians faster than they can process older information. 
                    The average civilian probably doesn't think to question the war efforts during the time it happens, solely because it is a way to defend themselves against 
                    the threat of terrorism. However, as information channels begin to incorporate different viewpoints, the idea of what is considered the truth begins to change 
                    as well. It no longer becomes something which is proven through observation and analysis, but rather through attention. The invasion of Iraq proves just this. 
                    It shows us how we begin to believe the “truth” of battling terrorism, which is just a guise for the military industrial complex to acquire resources and 
                    destabilize a major global region. 
                </p>
                <p>Is my brief analysis on this event the truth? Probably not, as we would need some way to prove my beliefs are in fact correct. This only happens through 
                    observation and experience, which are crucial in figuring out the truth. So how does this all tie into apathy? If you are consistently bombarded with 
                    news which is biased towards a particular viewpoint, then we internally begin to mold our values to fit this narrative. If major media outlets begin to 
                    analyze crime rates in America, and begin to throw around un-verified statistics claiming that “...despite making up X percent of the population, a 
                    certain group commits Y percent of the crime…”, then you will probably begin to associate criminal behaviors with said group. You probably have had very 
                    minimal interactions with people of said group, and with this, you think about each negative meeting you've had. Even though you might have had positive 
                    encounters, you couple the news about the crime rates of that group with the small number of negative encounters, and this in turn influences your 
                    internal bias. The monster known as apathy now begins to take root.
                </p>
                <p>Apathy is an interesting concept, one which seeks to elevate individualism but demote the idea of a community. With information channels opening the 
                    flood-gates, humans get hit with multiple different narratives, and each one can in turn either adjust your bias, or prevent that by providing 
                    un-filtered, unbiased data. If you consistently adjust your biases, then you will likely in turn come to implicitly dislike certain groups of people, 
                    or place certain groups on a pedestal. The irony is that if you place groups on pedestals, then you probably have a diminished interest for everyone 
                    else! If you were empathetic, then you would seek to understand everyone and their perspectives, and in turn use that to develop your own 
                    understanding of the world around you. However, with increased bias, we develop apathy for people, and now, your understanding of the world is more 
                    rigid. The rigidity of your worldly axioms determines how malleable you are to your observations. However, with diminished attention spans, 
                    observations become less common. As a result, the critical thinking skills of humans decreases, which makes them more malleable to disinformation.
                </p>

                <h2>Attention</h2>

                <p>I love machine learning a lot! I think automation is the principle behind what creates a universal axiom based on what is considered the truth. 
                    Everything in our life is systematic, from the ways our bodies create proteins to handle different regulatory tasks to the way governments form 
                    sub-systems to regulate civilians. Our brains are also in a way a system, and our attention spans are a result of the neuronal sub-systems which 
                    dictate different responses to stimuli. Let's dissect an example! 
                </p>
                <p>You go hiking on a trail which offers a range of different waterfalls and flauna/flora. The first time you go, you are in awe by the beauty of nature, 
                    and pause at each landmark to take in your full observations. You decide to go on this trail every Friday morning as you conveniently work from home 
                    and have the time to make this trek. The first few months, you still look upon each landmark in admiration, basking in the glory of the world in 
                    going through so many small adjustments for millions of years to paint this wonderful canvas. However, after the 5th month, you walk past each 
                    landmark without even a glance. When you finish the trail and trek back to the entrance, a lovely couple asks you how it was. You begin to explain 
                    how glorious each waterfall is, and encouraging them to take in the surroundings. Once you make it back to your car, you ask yourself why you have 
                    such wonderful words for the sights you've seen, but no longer feel the same connectedness to nature as you might've the first couple of times. 
                </p>
                <p>This example can be overlaid on something similar in our current lives. War is something that will never change. Country leaders will always push 
                    for events which will give them competitive advantages over others. As a result, a country invades another and commits immeasurable war crimes. 
                    As we live in the age of information, each battle/skirmish is analyzed in seemingly real-time on social media. For the first few months, each human 
                    rights violation is opposed by onlookers worldwide. However, as the same news occurs without any positive change, the onlookers begin to stop 
                    paying as much attention. Humans get desensitized to bad news if they only see this information on news without any concrete observations. 
                    Yet, even with observations, humans still get de-sensitized to the events present around them. After the 80th homeless person you see on the street, 
                    you stop thinking about how to help them or being curious about their story. After the 20th first date you've gone on, you begin to view each as a 
                    chore and your taste changes as a result. The value of a human is not as high as it used to be! Multiple humans no longer create communities where 
                    each can learn about each other in an intimate setting. In our age of information, multiple humans vye for attention amongst each other, and are no 
                    longer concerned about the way these humans are, but only on the superficial qualities of them. 
                </p>
        </div>
      </div>
    </div>
  );
};

export default Blog3;
