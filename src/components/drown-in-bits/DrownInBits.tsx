import React, { useEffect, useRef } from 'react';
import Matter, { Bodies, Composite, Engine, Render, World, Common, Vertices, Svg } from 'matter-js'
import NotificationService from '../../services/NotificationService';
import primogem from './primogem_svg.svg';

Common.setDecomp(require('poly-decomp'));

const getRadiusFromBits = (bits : number) : number[] => {
    let bitsRadii : number[] = [];
    if (bits >= 5000) {
        for (let i = 0; i < Math.floor(bits / 5000); i++) {
            bitsRadii.push(200);
        }
        bits = bits % 5000;
    } 
    
    if (bits >= 1000) {
        for (let i = 0; i < Math.floor(bits / 1000); i++) {
            bitsRadii.push(100);
        }
        bits = bits % 1000;
    }

    if (bits >= 500) {
        for (let i = 0; i < Math.floor(bits / 500); i++) {
            bitsRadii.push(50);
        }
        bits = bits % 500;
    }

    if (bits >= 100) {
        for (let i = 0; i < Math.floor(bits / 100); i++) {
            bitsRadii.push(35);
        }
        bits = bits % 100;
    }

    if (bits >= 50) {
        for (let i = 0; i < Math.floor(bits / 50); i++) {
            bitsRadii.push(25);
        }
        bits = bits % 50;
    }

    if (bits >= 10) {
        for (let i = 0; i < Math.floor(bits / 10); i++) {
            bitsRadii.push(20);
        }
        bits = bits % 10;
    }

    if (bits >= 1) {
        for (let i = 0; i < Math.floor(bits); i++) {
            bitsRadii.push(10);
        }
    }
    return bitsRadii;
}

const DrownInBits = () => {


    const scene = useRef();
    const engine = useRef(Engine.create());

    useEffect(() => {
        //listener
        let removeNotifListener = NotificationService.getInstance().addNotificationListener('cheer', (type : string, payload : any) => {
            console.log('drown in bits type', type);
            console.log('drown in bits payload', payload);
            if (type === 'cheer') {
                // let balls = getRadiusFromBits(payload.bits).map((rad) => {
                //     console.log("map", (rad/256) * 4)
                //     const ball = Bodies.circle(Math.floor(Math.random() * 1920), 200, rad, {
                //         mass: 10,
                //         restitution: 0.9,
                //         friction: 0.005,
                //         render: {
                //             fillStyle: '#0000ff'
                //             // sprite: {
                //             //     texture: `${process.env.PUBLIC_URL}/genshin/primogem.png`,
                //             //     xScale: (rad/256) * 4,
                //             //     yScale: (rad/256) * 4
                //             // }
                //         }
                //     });
                //     return ball;
                // })
                // World.add(engine.current.world, balls);
                // const ball = Bodies.circle(Math.floor(Math.random() * 1920), 200, 100, {
                //     mass: 10,
                //     restitution: 0.9,
                //     friction: 0.005,
                //     render: {
                //         // fillStyle: '#0000ff'
                //         sprite: {
                //             texture: `${process.env.PUBLIC_URL}/genshin/primogem.png`,
                //             xScale: 1,
                //             yScale: 1
                //         }
                //     }
                // });
                // World.add(engine.current.world, [ball])
                // fetch(`${process.env.PUBLIC_URL}/genshin/primogem.svg`)
                // fetch(primogem)
                // .then(response => { return response.text() })
                // .then((raw) => {console.log("raw", raw); return new window.DOMParser().parseFromString(raw, 'image/svg+xml')})
                // .then((root) => {
                //     console.log(root.querySelectorAll('polygon'));
                //     let color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
                //     let polygonNodes = root.querySelectorAll('polygon');

                //     //convert to path
                //     polygonNodes.forEach((poly) => {
                //         let svgNS = poly.ownerSVGElement.namespaceURI;
                //         let path = document.createElementNS(svgNS, 'path');
                //         let points = poly.getAttribute('points').split(/\s+|,/);
                //         let x0 = points.shift(), y0 = points.shift();
                //         var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');

                //         path.setAttribute('id', poly.getAttribute('id'));
                //         path.setAttribute('fill', poly.getAttribute('fill'));
                //         path.setAttribute('stroke', poly.getAttribute('stroke'));
                //         path.setAttribute('d', pathdata);

                //         poly.parentNode.replaceChild(path,poly);
                //     });

                //     console.log("newRoot", root);

                //     let vertexSets = Array.prototype.slice.call(root.querySelectorAll('path')).map((path) => {
                //         let vertices = Svg.pathToVertices(path, 30);
                //         return Vertices.scale(vertices, 0.4, 0.4, Vertices.centre(vertices));
                //     });

                //     console.log("vertexSets", vertexSets)

                //     World.add(engine.current.world, Bodies.fromVertices(500, 200, vertexSets, {
                //         mass: 5,
                //         friction: 0.4,
                //         render: {
                //             // fillStyle: color,
                //             // strokeStyle: color,
                //             // lineWidth: 1
                //             fillStyle: 'none',
                //             sprite: {
                //                 texture: `${process.env.PUBLIC_URL}/genshin/primogem.png`,
                //                 xScale: 0.4,
                //                 yScale: 0.4
                //             },
                //         }
                //     }, true));
                // })
            }
        });

        Common.setDecomp(require('poly-decomp'));

        //engine render
        const cw = document.body.clientWidth;
        const ch = document.body.clientHeight;
        const currEngine = engine.current;

        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
              width: cw,
              height: ch,
              wireframes: false,
              background: 'transparent'
            }
        });

        World.add(engine.current.world, [
            Bodies.rectangle(cw / 2, 0, cw, 20, { isStatic: true }),
            Bodies.rectangle(0, ch / 2, 20, ch, { isStatic: true }),
            Bodies.rectangle(cw / 2, ch, cw, 20, { isStatic: true }),
            Bodies.rectangle(cw, ch / 2, 20, ch, { isStatic: true })
        ]);

        Matter.Runner.run(engine.current);
        Render.run(render);

        return () => {
            removeNotifListener();

            // destroy Matter
            Render.stop(render);
            Composite.clear(currEngine.world, true);
            Engine.clear(currEngine);
            render.canvas.remove();
            render.canvas = null;
            render.context = null;
            render.textures = {};
          }
    }, []);

    return (
        <div className="drown-in-bits" ref={scene} style={{ width: '100%', height: '100%' }} >

        </div>
    );
}

export default DrownInBits;