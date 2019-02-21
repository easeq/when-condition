import when from '../src/index';

describe('when', () => {
    let data = {
        name: 'John Doe',
        age: 18,
        country: 'Germany'
    }

    it('callback', () => {
        expect(when(function(data) {
            return data.name == 'John Doe' && data.age >= 18
        }, data)).to.equal(true)

        expect(when(function(data) {
            return data.name == 'John' && data.age >= 18
        }, data)).to.equal(false)
    })

    it('mixed deep conditions', () => {
        let rules = ['and',
            ['is', 'name', 'John Doe'],
            ['gte', 'age', 18],
            ['or',
                ['is', 'country', 'Germany'],
                ['is', 'country', 'Spain']
            ]
        ]
        expect(when(rules, data)).to.equal(true)
    })

    it('throws error on invalid logical rule', () => {
        (function() {
            let rules = ['and',
                ['is', 'name', 'John Doe'],
                ['gte', 'age', 18],
                ['xor',
                    ['is', 'country', 'Germany'],
                    ['is', 'country', 'Spain']
                ]
            ]

            when(rules, data)
        }.should.throw(/Invalid comparison rule/));
    })
})
