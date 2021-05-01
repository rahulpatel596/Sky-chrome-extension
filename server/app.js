const bodyParser = require('body-parser')
const app = require('express')();
const cors = require("cors");
app.use(cors());
var jsonParser = bodyParser.json();

const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: 'fnAEHnX-PxACBNel7_dkAPv7e_5VSPOOMGXZ2OEm' });

const { Get, Ref, Select , Match, Index, Create, Collection, Lambda, Var, Join } = faunadb.query;

app.get('/user/:id', async (req, res) => { 
    console.log('got here');
    const doc = await client.query(
        Get(
            Ref(
                Collection('Users'),
                req.params.id
            )
        )
    ).catch(err => res.send(err))
res.send(doc)
})

app.post('/user', jsonParser, async (req, res) => {
    const doc = await client.query(
        Create(
            Collection('Users'),
            {
                data: {
                    name: req.body.name,
                    email: req.body.email
                },
                credentials: {
                    password: req.body.password
                }
            }
        )
        ).then(res => console.log(res))
        .catch(err => console.error(err));
    res.send(doc)
})

app.listen(5000, () => console.log("Server started on 5000"))