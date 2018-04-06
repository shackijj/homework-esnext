const ajax = require('./ajax')

describe('ajax', () => {
  describe('#get', () => {
    describe('given that url, onResolve and onReject are passed', () => {
      let url = 'someUrl'
      let onReject
      let onResolve
      let requestStub

      beforeEach((done) => {
        const callDone = () => done()
        onResolve = jest.fn(callDone)
        onReject = jest.fn(callDone)
        ajax.get(url, onResolve, onReject, requestStub)
      })

      describe('given that request succeed', () => {
        beforeAll(() => {
          requestStub = () => Promise.resolve(42)
        })
        it('will call onResolve once', () => {
          expect(onResolve).toHaveBeenCalledTimes(1)
        })
        it('will call onResolve with result', () => {
          expect(onResolve).toBeCalledWith(42)
        })
        it('will not onReject with result', () => {
          expect(onReject).not.toBeCalled()
        })
      })
    })

    describe('given that get was called twice', () => {
      let url = 'someUrl'
      let onReject1
      let onResolve1
      let onResolve2
      let onReject2
      let requestStub1
      let requestStub2

      describe('given that both requests succeeded', () => {
        beforeEach((done) => {
          const callDone = () => done()
          onResolve1 = jest.fn()
          onReject1 = jest.fn()
          onResolve2 = jest.fn(callDone)
          onReject2 = jest.fn(callDone)
          ajax
            .get(url, onResolve1, onReject1, requestStub1)
            .get(url, onResolve2, onReject2, requestStub2)
        })

        describe('given that request succeed', () => {
          beforeAll(() => {
            requestStub1 = () => Promise.resolve(1)
            requestStub2 = () => Promise.resolve(2)
          })
          it('will call onResolve1 once', () => {
            expect(onResolve1).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve1 with the result of that's request`, () => {
            expect(onResolve1).toHaveBeenCalledWith(1)
          })
          it(`will call onResolve2 once`, () => {
            expect(onResolve2).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve2 with the array where the first arg is result of previous request and the second is an array which contains results of previous calls`, () => {
            expect(onResolve2).toHaveBeenCalledWith(2, [1, 2])
          })
        })
      })
    })

    describe('given that get was called thrice', () => {
      let url1 = 'url1'
      let url2 = 'url2'
      let onReject1
      let onResolve1
      let onResolve2
      let onReject2
      let requestStub1
      let requestStub2

      describe('given that all requests succeeded', () => {
        beforeEach((done) => {
          const callDone = () => done()
          onResolve1 = jest.fn()
          onReject1 = jest.fn()
          onResolve2 = jest.fn(callDone)
          onReject2 = jest.fn(callDone)
          ajax
            .get(url1, onResolve1, onReject1, requestStub1)
            .get(url2, onResolve2, onReject2, requestStub2)
        })

        describe('given that request succeed', () => {
          beforeAll(() => {
            requestStub1 = jest.fn(() => Promise.resolve(1))
            requestStub2 = jest.fn(() => Promise.resolve(2))
          })
          it('will call requestStub1 with url1', () => {
            expect(requestStub1).toHaveBeenCalledWith(url1)
          })
          it('will call onResolve1 once', () => {
            expect(onResolve1).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve1 with the result of that's request`, () => {
            expect(onResolve1).toHaveBeenCalledWith(1)
          })
          it('will call requestStub1 with url2', () => {
            expect(requestStub2).toHaveBeenCalledWith(url2)
          })
          it(`will call onResolve2 once`, () => {
            expect(onResolve2).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve2 with the array where the first arg is result of previous request and the second is an array which contains results of previous calls`, () => {
            expect(onResolve2).toHaveBeenCalledWith(2, [1, 2])
          })
        })
      })
    })
  })
})
