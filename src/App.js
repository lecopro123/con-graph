
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {

  const canvasref = useRef(null)
  const contextref = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [nat, setnat] = useState({})

  const [re, setre] = useState('')

  const [write, setwrite] = useState(true)
  const [size1, setsize] = useState(10)
  const [und, setund] = useState([])
  const [drag, setdrag] = useState(false)
  const [polygon, setpo] = useState(3)
  const [col, setcol] = useState('#ff0000')
  const [line, setline] = useState(false)
  const [exs, setexs] = useState({})
  const [store, setstore] = useState([])
  const [temp, settemp] = useState()
  const [lubber, setlubber] = useState(false)
  const [pubber, setpubber] = useState(false)

  const [X1, setX1] = useState(0)
  const [Y1, setY1] = useState(0)
  // const [X2, setX2] = useState(0)
  // const [Y2, setY2] = useState(0)





  useEffect(() => {
    const canvas = canvasref.current;

    canvas.width = window.innerWidth / 1.2;
    canvas.height = window.innerHeight / 1.7;
    canvas.style.width = `${window.innerWidth / 1.2}px`;
    canvas.style.height = `${window.innerHeight / 1.7}px`;
    canvas.style.outline = 'dotted'

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.linecap = "round";
    context.strokeStyle = 'black';
    context.lineWidth = 5
    contextref.current = context;
    // console.log(write)
  }, [])

  // console.log(exs, store, re)





  const start = ({ nativeEvent }, e) => {
    const { offsetX, offsetY } = nativeEvent;
    setnat({ offsetX, offsetY })
    // console.log(nativeEvent)
    if (drag) {
      var item = close(offsetX, offsetY)
      settemp(store[item])
      // console.log(store[item], item)
      if (store[item] === undefined || store[item].type === 'line' || store[item].type === 'Wline') return setdrag(false)
      //setdd(contextref.current.getImageData(offsetX - 100, offsetY - 90, 170, 150))
      polyeraser(store[item].X, store[item].Y, parseInt(store[item].size), parseInt(store[item].type))
      setstore(store.filter((x, j) => j !== item))
      //setund(und.pop())
    }
    else if (line) {
      setX1(offsetX);
      setY1(offsetY)
      //exs['X1'] = offsetX
      //exs['Y1'] = offsetY
      contextref.current.strokeStyle = 'black';
      contextref.current.lineWidth = 1
      contextref.current.beginPath();
      contextref.current.moveTo(offsetX, offsetY);
    }
    else if (lubber) {
      setX1(offsetX);
      setY1(offsetY)
      contextref.current.strokeStyle = 'white';
      contextref.current.lineWidth = 10
      contextref.current.beginPath();
      contextref.current.moveTo(offsetX, offsetY);
    }
    else if (pubber) {
      //console.log('pubber')
      var items = close(offsetX, offsetY)
      //settemp(store[items])
      // console.log(store[items])
      if (store[items] === undefined || store[items].type === 'line' || store[items].type === 'Wline') { return setpubber(false) }
      //setdd(contextref.current.getImageData(offsetX - 100, offsetY - 90, 170, 150))
      polyeraser(store[items].X, store[items].Y, parseInt(store[items].size), parseInt(store[items].type))
      setstore(store.filter((x, j) => x.X !== store[items].X && x.Y !== store[items].Y))
      //setund(und.pop())
    }
    else {
      //  console.log('e d')
      Object.preventExtensions(contextref.current.lineWidth = parseInt(size1));
      if (!write) { Object.preventExtensions(contextref.current.strokeStyle = 'white'); }
      else if (write) { Object.preventExtensions(contextref.current.strokeStyle = 'black'); }
      //const rect = canvasref.current.getBoundingClientRect()
      //console.log(nativeEvent, rect)
      contextref.current.beginPath();
      contextref.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finish = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ////console.log(offsetX)
    if (line) {
      // console.log('line')
      // exs['X2'] = offsetX
      // exs['Y2'] = offsetY
      contextref.current.lineTo(offsetX, offsetY);
      contextref.current.stroke();
      setstore(cr => [...cr, { type: 'line', exs: { 'X1': X1, 'Y1': Y1, 'X2': offsetX, 'Y2': offsetY } }])
      setline(false)
    }
    else if (lubber) {
      // console.log('lubber')
      //exs['X2'] = offsetX
      // exs['Y2'] = offsetY
      contextref.current.lineTo(offsetX, offsetY);
      contextref.current.stroke();
      setstore(cr => [...cr, { type: 'Wline', exs: { 'X1': X1, 'Y1': Y1, 'X2': offsetX, 'Y2': offsetY } }])
      setlubber(false)
    }
    else if (drag) {
      //  console.log('drag')
      //console.log('s f')
      polycreater(nativeEvent, temp);
      //contextref.current.putImageData(dd, offsetX - 100, offsetY - 100);
      return setdrag(false)
    }
    else if (pubber) {
      //  console.log(store)
      return setpubber(false)
    }

    //console.log(nativeEvent)
    contextref.current.closePath();
    setIsDrawing(false);
    //if (!write) { Object.preventExtensions(contextref.current.strokeStyle = 'black'); setwrite(true) }
    if (JSON.stringify({ offsetX, offsetY }) !== JSON.stringify(nat) && nat !== {}) setund(cr => [...cr, contextref.current.getImageData(0, 0, Number(window.innerWidth / 1.2), Number(window.innerWidth / 1.2))]);
  };

  const draw = ({ nativeEvent }) => {
    //console.log(und[- 1])
    //if()
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    //const rect = canvasref.current.getBoundingClientRect()
    // console.log(nativeEvent)
    //  console.log('s draw')
    contextref.current.lineTo(offsetX, offsetY);
    contextref.current.stroke();
  };

  function polyeraser(X, Y, s, t) {
    //  console.log(X, Y)
    //const { offsetX, offsetY } = nat;
    var numberOfSides = t,
      size = s + 2,
      Xcenter = X,
      Ycenter = Y;
    // console.log(Xcenter,Ycenter)

    const cxt = contextref.current

    cxt.beginPath();
    cxt.moveTo((Xcenter + size * Math.sin(0)), (Ycenter + size * Math.cos(0)));
    //console.log(Xcenter + size * Math.sin(0), Ycenter + size * Math.cos(0));

    for (var i = 1; i <= numberOfSides; i += 1) {
      cxt.lineTo(Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
      //console.log(Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides))
    }

    cxt.fillStyle = "white";
    //cxt.lineWidth = 2;
    cxt.fill();
    //cxt.setTransform(1, 0, 0, 1, 0, 0);
  }

  function polycreater(X, temp) {


    const { offsetX, offsetY } = nat;

    var numberOfSides = temp ? parseInt(temp.type) : polygon,
      size = temp ? parseInt(temp.size) : size1,
      Xcenter = X.hasOwnProperty('nativeEvent') ? offsetX : X.offsetX,
      Ycenter = X.hasOwnProperty('nativeEvent') ? offsetY : X.offsetY;


    const cxt = contextref.current



    cxt.beginPath();
    cxt.moveTo((Xcenter + size * Math.sin(0)), (Ycenter + size * Math.cos(0)));

    //console.log(Xcenter + size * Math.sin(0), Ycenter + size * Math.cos(0));

    for (var i = 1; i <= numberOfSides; i += 1) {
      cxt.lineTo(Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
      //console.log(Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides))
    }

    cxt.fillStyle = temp ? temp.color : col
    cxt.strokeStyle = "#000000";
    cxt.lineWidth = 1;
    cxt.stroke();
    cxt.fill();

    // console.log(temp ? temp.color : '')
    //var text = document.createTextNode("Tutorix is the best e-learning platform");
    //var color=temp?temp.color:col
    //cxt.setTransform(1, 0, 0, 1, 0, 0);
    setund(cr => [...cr, cxt.getImageData(0, 0, Number(window.innerWidth / 1.2), Number(window.innerWidth / 1.2))]);
    setstore(cr => [...cr, { type: temp ? parseInt(temp.type) : polygon, size: temp ? parseInt(temp.size) : size1, color: temp ? temp.color : col, X: Xcenter, Y: Ycenter }])
    //arr.push(cxt.getImageData(0, 0, Number(window.innerWidth / 1.2), Number(window.innerWidth / 1.2)));
  }

  function close(x, y) {
    var arr = []
    for (let i = 0; i < store.length; i++) {
      if (store[i].type !== 'line' && store[i].type !== 'Wline') {
        var k = Math.sqrt(Math.abs((x - store[i].X) ** 2 + (y - store[i].Y) ** 2))
        arr.push(Math.ceil(k))
        // console.log(Math.ceil(k))
        // console.log(k)
      }
      else {
        arr.push(Infinity)
      }
    }
    let min = Math.min(...arr)
    // console.log(min)
    //  console.log(arr.indexOf(min))
    return arr.indexOf(min)
  }

  function recreater() {
    if (re === 0 || re === '') return;
    //localStorage.setItem('data', JSON.stringify(re))
    for (let i = 0; i < re.length; i++) {
      if (re[i].type === 'line') {
        contextref.current.strokeStyle = 'black';
        contextref.current.lineWidth = 1
        contextref.current.beginPath();
        contextref.current.moveTo(re[i].exs.X1, re[i].exs.Y1);
        contextref.current.lineTo(re[i].exs.X2, re[i].exs.Y2);
        contextref.current.stroke();
      }
      else if (re[i].type === 'Wline') {
        contextref.current.strokeStyle = 'white';
        contextref.current.lineWidth = 10
        contextref.current.beginPath();
        contextref.current.moveTo(re[i].exs.X1, re[i].exs.Y1);
        contextref.current.lineTo(re[i].exs.X2, re[i].exs.Y2);
        contextref.current.stroke();
      }
      else if (re[i].type !== 'line' && re[i].type !== 'Wline') {
        var numberOfSides = parseInt(re[i].type),
          size = parseInt(re[i].size),
          Xcenter = re[i].X,
          Ycenter = re[i].Y;

        const cxt = contextref.current

        cxt.beginPath();
        cxt.moveTo((Xcenter + size * Math.sin(0)), (Ycenter + size * Math.cos(0)));

        //console.log(Xcenter + size * Math.sin(0), Ycenter + size * Math.cos(0));

        for (var j = 1; j <= numberOfSides; j += 1) {
          cxt.lineTo(Xcenter + size * Math.sin(j * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(j * 2 * Math.PI / numberOfSides));
          //console.log(Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides))
        }

        cxt.fillStyle = re[i].color
        cxt.strokeStyle = "#000000";
        cxt.lineWidth = 1;
        cxt.stroke();
        cxt.fill();

      }
    }
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-12">
          <canvas
            onMouseDown={start}
            onMouseUp={finish}
            onMouseMove={draw}
            ref={canvasref}
          >
            <div id='kbc'>hello</div>
          </canvas>
        </div>
        <div className="row justify-content-center gap p-2">
          <button onClick={polycreater} className="btn btn-primary">Create</button>
          <button onClick={() => { setline(true); setdrag(false); setlubber(false); setpubber(false); }} className="btn btn-primary">Line</button>
          {store.length ? <button onClick={() => { setline(false); setlubber(false); setpubber(false); setdrag(true) }} className="btn btn-primary">Drag</button> : <button disabled onClick={() => setdrag(true)} className="btn btn-primary">Drag</button>}
          {drag ? <button onClick={() => setdrag(false)} className="btn btn-primary">Undrag</button> : <button disabled onClick={() => setdrag(false)} className="btn btn-primary">Undrag</button>}
          <button onClick={() => { setline(false); setlubber(true); setpubber(false); setdrag(false) }} className="btn btn-primary">Rub-Line</button>
          <button onClick={() => { setline(false); setlubber(false); setpubber(true); setdrag(false) }} className="btn btn-primary">Rub-Poly</button>
          <input style={{ width: '70px', height: '-webkit-fill-available' }} type="color" onChange={(e) => setcol(e.target.value)} value={col} />
        </div>
        <div className="row justify-content-center gap p-2">
          <button onClick={() => setwrite(false)} className="btn btn-primary">Rub</button>
          <button onClick={() => setwrite(true)} className="btn btn-primary">Write</button>
        </div>
        <div className="row  gap pt-2">
          <div className="d-flex flex-column align-items-center">
            <span style={{ color: 'green', fontSize: '12px' }}>No of sides : {polygon}</span>
            <input style={{ width: 'fit-content' }} value={polygon} onChange={(e) => { setpo(e.target.value) }} type="range" min="3" max="10"></input>
          </div>
          <div className="d-flex flex-column align-items-center">
            <span style={{ color: 'green', fontSize: '12px' }}>Size</span>
            <input style={{ width: 'fit-content' }} value={size1} onChange={(e) => setsize(e.target.value)} type="range" min="10" max="50"></input>
          </div>
        </div>
        <div className="row justify-content-center  gap pt-lg-5 pb-lg-5">
          <div className="  col d-flex justify-content-center ">
            <div className="jsc">
              <h5 style={{ fontFamily: 'Josefin sans' }}>Copy paste this to the other box to recreate </h5>
              {store.length ? JSON.stringify(store) : ''}
            </div>
          </div>
          <div className="   col d-flex justify-content-center gy-2">
            <div className="jsc d-flex justify-content-center align-items-center flex-column">
              <textarea onChange={(e) => e.target.value ? setre(JSON.parse(e.target.value)) : setre('')} ></textarea>
              <div className="p-2"></div>
              {re !== '' ? <button onClick={recreater} className="btn btn-primary ">Recreate</button> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
