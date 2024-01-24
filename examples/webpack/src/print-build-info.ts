import { name, version } from '~build/package'
import time from '~build/time'
import { isCI } from '~build/ci'
import { github } from '~build/git'

const printBuildInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  console.group('Build info')
  console.log('Project:', name)
  console.log('Build date:', time ? time.toLocaleString() : 'Unknown')
  console.log('Environment:', `${process.env.NODE_ENV}${isCI ? '(ci)' : ''}`)
  console.log('Version:', version)
  console.log(`${name} is an open source project, you can view its source code on Github!`)
  console.log(github)
  console.groupEnd()
}

printBuildInfo()