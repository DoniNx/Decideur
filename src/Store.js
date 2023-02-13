import { writable } from "svelte/store";

export let parametersStore = writable([
    {
    name: "price",
    options: [
        {
            title:"best",
            val: 3
        },
        {
            title:"good",
            val: 2
        },
        {
            title:"bad",
            val:1
        }
    ]
}, 
    {
    name: "funtionality",
    options: [
        {
            title:"best",
            val: 3
        },
        {
            title:"good",
            val: 2
        },
        {
            title:"bad",
            val:1
        }
    ]
}

])


export let alternativesStore = writable([
    {
        name: 'iphone x',
        stats: [
            {title: "price", val: 0},
            {title: "functionality", val: 0},
        ],
            score: 0
        },
        {
            name: 'iphone se 3',
            stats: [
                {title: "price", val: 0},
                {title: "functionality", val: 0},
            ],
                score: 0
            },  
    ])
