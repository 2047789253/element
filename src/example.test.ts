import { expect, test, describe, vi } from 'vitest'
import type { Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

test('test common matcher', () => {
  const name = 'viking'
  expect(name).toBe('viking')
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})
test('test to be true or false', () => {
  expect(2).toBeTruthy()
  expect(0).toBeFalsy()
})
test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(0).toBeLessThan(3)
})
test('test object', () => {
  expect({ name: 'viking' }).toEqual({ name: 'viking' })
})

describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(11, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(11)
  })
  test('spy on method', () => {
    const obj = {
      getName: () => '1',
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: '123' }))
    mockedAxios.get.mockResolvedValue({ data: '123' })
    const result = await request()
    expect(result).toBe('123')
  })
})
