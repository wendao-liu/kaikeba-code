// const add = (x, y) => x + y
// const square = z => z * z


// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// const compose = (...[first,...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }


// const fn = compose(add, square)

// // const fn = (x, y) => square(add(x, y))
// console.log(fn(1, 2))


function compose(middlewares) {
    return function (ctx) {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(ctx, function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

// fn1666 fn2666 fn3666 退回来 end fn2  end fn1
async function fn1(ctx, next) {
    console.log('fn1', ctx)
    await next()
    console.log('end fn1')
}

async function fn2(ctx, next) {

    setTimeout(() => console.log('fn2', ctx), 2000)
    await delay()
    await next()
    setTimeout(() => console.log('end fn2', ctx), 2000)
}

function fn3(ctx, next) {
    console.log('fn3', ctx)
}

function delay() {
    return Promise.resolve(res => {
        setTimeout(() => reslove(), 2000)
    })
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
let ctx = 666;
finalFn(ctx)