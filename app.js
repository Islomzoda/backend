const express = require('express');
const cors = require('cors');

const ERR_NOT_FOUND = 'error.not_found';

let nextId = 1;
let posts = [
    { id: nextId++, content: 'First post', likes: 0 },
    { id: nextId++, content: 'Second post', likes: 0 }
];

const server = express();
server.use(express.json());
server.use(cors());


function findPostIndexById(id){
 return posts.findIndex(o => o.id === id);
}

server.get('/api/posts', (req, res) => {
    res.send(posts)
});

server.post('/api/posts', (req, res) => {
    const body = req.body;
    const id = body.id;
    
    if (id  === 0) {
      posts = [...posts, {
            id: nextId++,
            content: body.content,
            likes: 0,
        }];
        res.send(posts);
        return;
    }
    const index = findPostIndexById(id)
    if(index === -1){
        res.status(404).send(ERR_NOT_FOUND);
        return;
    }
   posts = posts.map(o => o.id !== id ? o : {...o, content: body.content});
    res.send(posts);
})


server.delete('/api/posts/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = findPostIndexById(id)
    if(index === -1){
        res.status(404).send(ERR_NOT_FOUND);
        return;
    }
   posts = posts.filter(o => o.id != id);
  
    res.send(posts)
})

server.post('/api/posts/:id/likes', (req, res) => {
    const id = Number(req.params.id);
   
    posts = posts.map(o => o.id !== id ? o : {...o, likes: o.likes + 1});

    const index = findPostIndexById(id)
    if(index === -1){
        res.status(404).send(ERR_NOT_FOUND);
        return;
    }
    res.send(posts)
})

server.delete('/api/posts/:id/likes', (req, res)=> {
    const id = Number(req.params.id);
  
  

    posts = posts.map(o => o.id !== id ? o : {...o, likes: o.likes - 1});
    res.send(posts)
    const index = findPostIndexById(id);
    if (index === -1){
        res.status(404).send(ERR_NOT_FOUND);
        return;
    }
})


server.listen(process.env.PORT || 9999);
// const express = require('express');
// const cors = require('cors');

// getPostById()



// const server = express();
// server.use(cors());
// server.use(express.json());
// let nextPostId = 1;
// //
// let posts = [
//     {id: nextPostId++, name: 'first post'},
//     {id: nextPostId++, name: 'second post'}
// ];



// server.get('/api/posts', (req, res) => {
//     res.send(posts);
// });
// const ERR_NOT_FOUND = 'error.not_found';
// const ERR_BAD_REQUEST = 'error.bad_request';

// server.get('/api/posts/:id', (req, res) => {
//     // const { id } = req.params;
//     const id = parseInt(req.params.id, 10);


//     if(isNaN(id)){
//         res.statusCode = 400;

//         res.send({eror: ERR_BAD_REQUEST});
//         return;
//     }
//     res.send({});
// });

// server.post('/api/posts', (req, res) => {
//     const post = req.body;
//     if(post.id === 0){
//         posts = [...posts, {id: nextPostId, name: post.name} ]
//         nextPostId++;
//         res.send();
//         return;
//     }
// });

// server.delete('/api/posts/:id', (req, res) => {
//     const { a    } = req.params;
//     const parsedId = parsedInt(id, 10);
//     posts = posts.filter(o => o.id !== parsedId);
//     res.send();
// })

// server.listen(9999)