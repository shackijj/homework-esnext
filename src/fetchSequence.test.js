const fetchSequence = require('./fetchSequence')

describe('fetchSequence', () => {
  describe('given that url, onResolve and onReject are passed', () => {
    let url = 'someUrl'
    let onReject
    let onResolve
    let requestStub

    beforeEach((done) => {
      const callDone = () => done()
      onResolve = jest.fn(callDone)
      onReject = jest.fn(callDone)
      fetchSequence(url, onResolve, onReject, requestStub)
    })

    describe('given that request succeed', () => {
      beforeAll(() => {
        requestStub = () => Promise.resolve(42)
      })
      it('will call onResolve once', () => {
        expect(onResolve).toHaveBeenCalledTimes(1)
      })
      it('will call onResolve with result', () => {
        expect(onResolve).toBeCalledWith(42, [42])
      })
      it('will not onReject with result', () => {
        expect(onReject).not.toBeCalled()
      })
    })

    describe('given that request failed', () => {
      beforeAll(() => {
        requestStub = () => Promise.reject(new Error(42))
      })
      it('will not call onResolve', () => {
        expect(onResolve).toHaveBeenCalledTimes(0)
      })
      it('will call onReject once', () => {
        expect(onReject).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('#next', () => {
    describe('given that next was called once', () => {
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
          fetchSequence(url, onResolve1, onReject1, requestStub1)
            .next(url, onResolve2, onReject2, requestStub2)
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
            expect(onResolve1).toHaveBeenCalledWith(1, [1])
          })
          it(`will call onResolve2 once`, () => {
            expect(onResolve2).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve2 with the array where the first arg is result of previous request and the second is an array which contains results of previous calls`, () => {
            expect(onResolve2).toHaveBeenCalledWith(2, [1, 2])
          })
        })

        describe('given that second request failed', () => {
          let error = new Error(32)
          beforeAll(() => {
            requestStub1 = () => Promise.resolve(1)
            requestStub2 = () => Promise.reject(error)
          })
          it('will call onResolve1 once', () => {
            expect(onResolve1).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve1 with the result of that's request`, () => {
            expect(onResolve1).toHaveBeenCalledWith(1, [1])
          })
          it(`will call onReject. The first arg is result of previous request and the second is an array which contains results of previous calls`, () => {
            expect(onReject2).toHaveBeenCalledWith(error, [1])
          })
        })
      })
    })

    describe('given that get was called thrice', () => {
      let url1 = 'url1'
      let url2 = 'url2'
      let url3 = 'url3'
      let onReject1
      let onResolve1
      let onResolve3
      let onReject3
      let requestStub1
      let requestStub2
      let requestStub3

      describe('given that all requests succeeded', () => {
        beforeEach((done) => {
          const callDone = () => done()
          onResolve1 = jest.fn()
          onReject1 = jest.fn()
          onResolve3 = jest.fn(callDone)
          onReject3 = jest.fn(callDone)
          fetchSequence(url1, onResolve1, onReject1, requestStub1)
            .next(url2, undefined, undefined, requestStub2)
            .next(url3, onResolve3, onReject3, requestStub3)
        })

        describe('given that request succeed', () => {
          beforeAll(() => {
            requestStub1 = jest.fn(() => {
              return new Promise((resolve) => {
                setTimeout(() => resolve(1), 10)
              })
            })
            requestStub2 = jest.fn(() => {
              return new Promise((resolve) => {
                setTimeout(() => resolve(1), 20)
              })
            })
            requestStub3 = jest.fn(() => Promise.resolve(3))
          })
          it('will call requestStub1 with url1', () => {
            expect(requestStub1).toHaveBeenCalledWith(url1)
          })
          it('will call onResolve1 once', () => {
            expect(onResolve1).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve1 with the result of that's request`, () => {
            expect(onResolve1).toHaveBeenCalledWith(1, [1])
          })
          it('will call requestStub2 with url2', () => {
            expect(requestStub2).toHaveBeenCalledWith(url2)
          })
          it('will call requestStub3 with url3', () => {
            expect(requestStub3).toHaveBeenCalledWith(url3)
          })
          it(`will call onResolve3 once`, () => {
            expect(onResolve3).toHaveBeenCalledTimes(1)
          })
          it(`will call onResolve3 with the array where the first arg is result of previous request and the second is an array which contains results of previous calls`, () => {
            expect(onResolve3).toHaveBeenCalledWith(3, [1, 2, 3])
          })
        })
      })
    })
  })
})
