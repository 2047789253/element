import axios from 'axios'

export function testFn(number: number, callback: (value: number) => void) {
  if (number > 10) {
    callback(number)
  }
}

export async function request() {
  const { data } = await axios.get('fake.url')
  return data
}
