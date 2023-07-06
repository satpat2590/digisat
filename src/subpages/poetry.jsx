import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import './poetry.css';

const poems = [
    { 
      title: "Darkness (2020)", 
      desc: "There is no shame in being found within it", 
      img: "/poem-icons/darkness.svg", 
      path: "/poems/darkness" 
    },
    { 
      title: "Deteriorating (2019)", 
      desc: "Who wins in a race between our ambitions and our consciousness?", 
      img: "/poem-icons/deteriorating.svg", 
      path: "/poems/deteriorating" 
    },
    { 
      title: "Philosophy I (2021)", 
      desc: "First poem about learnings in my personal philosophy", 
      img: "/poem-icons/philosophy.svg", 
      path: "/poems/philosophy" 
    },
    { 
      title: "Unattainable (2018)", 
      desc: "How will you know if you don't try?", 
      img: "/poem-icons/unattainable.svg", 
      path: "/poems/unattainable" 
    },
    { 
      title: "Split (2020)", 
      desc: "How can we let ambition grow our personal selves?", 
      img: "/poem-icons/split.svg", 
      path: "/poems/split" 
    },
    { 
      title: "Definition (2017)", 
      desc: "Depiction of a classroom and the value of words", 
      img: "/poem-icons/definition.svg", 
      path: "/poems/definition" 
    },
    { 
      title: "Philosophy II (2021)", 
      desc: "Second poem about learnings in my personal philosophy", 
      img: "/poem-icons/philosophy.svg", 
      path: "/poems/philosophy2" 
    },
    { 
      title: "Narcissism (2021)", 
      desc: "Can you truly define success in a general sense?", 
      img: "/poem-icons/narcissism.svg", 
      path: "/poems/narcissism" 
    },
    { 
      title: "Obscurity (2021)", 
      desc: "Do your senses deceive you or is it a calling?", 
      img: "/poem-icons/obscurity.svg", 
      path: "/poems/obscurity" 
    },
  ];
  

export function Poetry() {

    return (
        <>
        <div className="container">
            <div className="grid">
                {poems.map((poem) => (
                    <Link className="poemLink" href={poem.path}>
                        <div className="card">
                            <h2>{poem.title}</h2>
                            <p>{poem.desc}</p>
                            <img src={poem.img} alt={poem.title} width="50" height="50" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </>



    );
}