const profiles = require('./src/app/graph-test/data.json')

let i = 1
profiles.forEach(p => {
    const [x1,y1,z1] = p[0]
    const [x2,y2,z2] = p[p.length -1]
    console.log('%d Longueur (%d): from %d to %d',i ,p.length, y1, y2)
    i++
})