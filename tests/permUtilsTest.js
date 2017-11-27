const tape=require('tape')
const permUtils=require('../permUtils')
const permTestSpecs=require('../test_files/input/testPerms.json')

const expectedNoPerms=require('../test_files/expected_output/noPerms.json')
const expectedAllPerms=require('../test_files/expected_output/allPerms.json')
const expectedTeamU=require('../test_files/expected_output/teamU.json')
const expectedTeamUAllOther=require('../test_files/expected_output/teamUAllOther.json')
const expectedRoleU=require('../test_files/expected_output/roleU.json')
const expectedCombinedWhitelist=require('../test_files/expected_output/combinedWhitelist.json')
const expectedCombinedBlackList=require('../test_files/expected_output/combinedBlackList.json')
const expectedInverted = require('../test_files/expected_output/inverted.json')

const invertThis=require('../test_files/input/invertThis.json')
const teamURoleU = require('../test_files/input/teamURoleU.json')
const blackShort= require('../test_files/input/blackShort.json')
const blackLong= require('../test_files/input/blackLong.json')

tape('getting no groups and no tables gives back no perms for no tables',t=>{
  t.plan(2);
  t.deepEqual(permUtils.getGroupPerms([],{}),{},' should equal an empty object')
  t.deepEqual(permUtils.getGroupPerms([],{},true),{},' should equal an empty object')
})

tape('getting no relevant groups',t=>{
  t.plan(4)
  t.deepEqual(permUtils.getGroupPerms([],permTestSpecs),expectedNoPerms,'should equal an object with no permissions for given tables for whitelist')
  t.deepEqual(permUtils.getGroupPerms([],permTestSpecs,true),expectedAllPerms,'should equal an object with all permissions for given tables for blacklist')
  t.deepEqual(permUtils.getGroupPerms(['foo','bar'],permTestSpecs),expectedNoPerms,'should equal an object with no permissions for given tables for whitelist')
  t.deepEqual(permUtils.getGroupPerms(['foo','bar'],permTestSpecs,true),expectedAllPerms,'should equal an object with all permissions for given tables for blacklist')
})

tape('getting test group with update permission',t=>{
  t.plan(2)
  t.deepEqual(permUtils.getGroupPerms(['fdsa'],permTestSpecs),expectedTeamU,'should give update permissions for team resource for whitelist')
  t.deepEqual(permUtils.getGroupPerms(['fdsa'],permTestSpecs,true),expectedTeamUAllOther,'should give update permissions for team resource for blacklist and grant all perms on all other tables')
})

tape('check a single permission for whitelist',t=>{
  t.plan(5)
  t.deepEqual(permUtils.hasPerm('team',['asdf'],'u',permTestSpecs),false,' has a relevant group but not the right permission')
  t.deepEqual(permUtils.hasPerm('team',[],'u',permTestSpecs),false,'has no groups, so no permission')
  t.deepEqual(permUtils.hasPerm('team',['foo'],'u',permTestSpecs),false,'has no relevant groups, so no permission')
  t.deepEqual(permUtils.hasPerm('team',['asdf'],'u',{}),false,'specs have no tables so no permission')
  t.deepEqual(permUtils.hasPerm('team',['asdf','fdsa'],'u',permTestSpecs),true,' has a group that has permission')
})

tape('check a single permission for blacklist',t=>{
  t.plan(5)
  t.deepEqual(permUtils.hasPerm('team',['asdf'],'u',permTestSpecs,true),false,' has a relevant group but not the right permission')
  t.deepEqual(permUtils.hasPerm('team',[],'u',permTestSpecs,true),true,'has no groups, so grant permission')
  t.deepEqual(permUtils.hasPerm('team',['foo'],'u',permTestSpecs,true),true,'has no relevant groups, so grant permission')
  t.deepEqual(permUtils.hasPerm('team',['asdf'],'u',{},true),true,'specs have no tables so grant permission')
  t.deepEqual(permUtils.hasPerm('team',['asdf','fdsa'],'u',permTestSpecs,true),false,' has a group that revokes permission')
})

tape('inverts permissions',t=>{
  t.plan(1)
  t.deepEqual(permUtils.invertResults(invertThis),expectedInverted,'should equal the inverted permissions')
})

tape('combining two whitelists of different sizes gives correct perms for all given tables',t=>{
  t.plan(2)
  t.deepEqual(permUtils.combineWhiteResults(teamURoleU,invertThis),expectedCombinedWhitelist,'long+short list result should match expected')
  t.deepEqual(permUtils.combineWhiteResults(invertThis,teamURoleU),expectedCombinedWhitelist,'short+long list result should match expected')
})

tape('combining whitelist and blacklist of different sizes gives correct perms for all given tables',t=>{
  t.plan(2)
  //white long with black short
  t.deepEqual(permUtils.combineWhiteAndBlackResults(teamURoleU,blackShort),expectedRoleU,'white longlist with black shortlist should match expected')
  //white short with black long
  t.deepEqual(permUtils.combineWhiteAndBlackResults(invertThis,blackLong),expectedTeamU,'white shortlist with black longlist should match expected')
})

tape('combining two blacklists of different sizes gives correct perms for all given tables',t=>{
  t.plan(2)
  t.deepEqual(permUtils.combineBlackResults(blackLong,blackShort),expectedCombinedBlackList,'long+short list result should match expected')
  t.deepEqual(permUtils.combineBlackResults(blackShort,blackLong),expectedCombinedBlackList,'short+long list result should match expected')
})

