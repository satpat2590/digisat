// import { useState } from 'preact/hooks';
// import './home.css';


// export function Home() {
//   return (
//     <>
//       <div
//         style={{
//           height: 'calc(100vh - 70px)', // adjust the header height if needed
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             width: '80%', // adjust the width as needed
//             marginTop: '2rem',
//             color: '#33FF00',
//           }}
//         >
//           <p>
//             avid geek of history, language, and automation. working to improve
//             my skills in every facet of my life!
//             <br></br>
//             <br></br>i believe the wheel of innovation is spinning faster and
//             faster, and with that, the amount of information considered to be
//             'general' has also expanded.
//             <br></br>
//             <br></br>i hope to be on the forefront of this wheel, guiding its
//             path.
//             <br></br>
//             <br></br>
//             here you'll find my journey to become a natural philosophist! enjoy
//             :)
//           </p>
//           <img
//             className="tree"
//             src="./treeofmemory.svg"
//             alt="Sample"
//             style={{
//               width: '250px',
//               height: '300px',
//               float: 'right',
//               right: '50px',
//               top: '40px',
//             }}
//           />
//         </div>
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gap: '5rem',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '40%',
//           }}
//         >
//           {['Blogs', 'Poems', 'Pictures'].map((name) => (
//             <a
//               href={`${name.toLowerCase()}`}
//               style={{ textDecoration: 'none', color: '#33ff00' }}
//             >
//               <div style={{ textAlign: 'center', color: '#33ff00' }}>
//                 <img
//                   src={`${name}.jpg`}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                   {name}
//                 <p>A short blurb about {name}</p>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }



import { useState } from 'preact/hooks';
import './home.css';

export function Home() {
  return (
    <>
      <div className="home-container">
        <div className="home-description">
          <p>
            avid geek of history, language, and automation. working to improve
            my skills in every facet of my life!
            <br></br>
            <br></br>i believe the wheel of innovation is spinning faster and
            faster, and with that, the amount of information considered to be
            'general' has also expanded.
            <br></br>
            <br></br>i hope to be on the forefront of this wheel, guiding its
            path.
            <br></br>
            <br></br>
            here you'll find my journey to become a natural philosophist! enjoy
            :)
          </p>
          <img
            className="tree"
            src="./treeofmemory.svg"
            alt="Sample"
          />
        </div>
        <div className="home-links">
          {[{title: 'blogs', description: 'thoughts about the world'}, {title: 'poems', description: 'things i have jotted down from high school onwards'}, {title: 'pictures', description: 'collection of photos from my life travels'}].map((name) => (
            <a
              href={`${name.title.toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#33ff00' }}
            >
              <div style={{ textAlign: 'center', color: '#33ff00', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                <img className="home-images"
                  src={`${name.title}.png`}
                />
                  {name.title}
                <p>{name.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

