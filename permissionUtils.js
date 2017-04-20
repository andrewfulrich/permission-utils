/**
 Permission Utils

 get Stormpath user groups for a given Stormpath Express req.user

 Author: Andrew Ulrich

 MIT License

 Copyright (c) 2017 Andrew F. Ulrich

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/**
 * get Stormpath user groups for a given Stormpath Express req.user
 * @param reqUser
 * @returns {Promise}
 */
function getUserGroups(reqUser) {
  return new Promise((resolve,reject)=>{
    let groups=[]
    reqUser.groups.each(function iterator(group, cb) {
      groups.push({
        name:group.name,
        id:group.href
      })
    }, function done() {
      resolve(groups)
    });
  })
}

module.exports={
  getUserGroups
}