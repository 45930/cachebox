import{W as D,J as q,c as h,b as e,a as n,P as c,i as v,I as f,d as b,Y as u,D as A,L as g}from"./index-b3f6643b.js";await D;function m(){const a=new g(e.random()),[o,t]=a.divMod(3);return n.if(t.equals(g.zero),e(1),n.if(t.equals(g.fromNumber(1)),e(2),e(3)))}class i extends q{revealedDoor;isWinner;constructor(o){super(o);this.winningDoor=h(),this.guessedDoor=h(),this.revealedDoor=0,this.isWinner=!1}deploy(o){super.deploy(),this.balance.addInPlace(o),e.random();const t=m();t.assertGt(e.zero),t.assertLt(e(4)),this.winningDoor.set(t),this.guessedDoor.set(e(0))}async guessDoor(o){const t=e(o);t.assertGt(e.zero),t.assertLt(e(4));const s=await this.winningDoor.get(),r=e.random().toBits();await this.guessedDoor.set(t);const l=n.if(s.equals(t),n.if(t.equals(e(1)),n.if(r.at(0).equals(c(!1)),e(2),e(3)),n.if(t.equals(e(2)),n.if(r.at(0).equals(c(!1)),e(1),e(3)),n.if(r.at(0).equals(c(!1)),e(1),e(2)))),n.if(t.equals(e(1)),n.if(s.equals(e(2)),e(3),e(2)),n.if(t.equals(e(2)),n.if(s.equals(e(1)),e(3),e(1)),n.if(s.equals(e(1)),e(2),e(1)))));n.asProver(()=>{console.log(`Revealed: ${l}`),this.revealedDoor=Number(l.toString())})}async evaluate(o){const t=c(o),s=await this.winningDoor.get(),r=await this.guessedDoor.get(),l=n.if(t,n.if(r.equals(s),c(!1),c(!0)),n.if(r.equals(s),c(!0),c(!1)));n.asProver(()=>{console.log(`Are you a winner?: ${l.toBoolean()}`),this.isWinner=l.toBoolean()})}async reset(){console.log("Resetting Door");const o=m();console.log(`Random door: ${o}`),await this.winningDoor.set(o),await this.guessedDoor.set(e(0))}}v(e)(i.prototype,"winningDoor");v(e)(i.prototype,"guessedDoor");Reflect.metadata("design:paramtypes",[Number])(i.prototype,"guessDoor");f(i.prototype);Reflect.metadata("design:paramtypes",[Boolean])(i.prototype,"evaluate");f(i.prototype);f(i.prototype);async function N(){const o=b.random().toPublicKey(),t=new i(o),s={title:"Monty Hall",subtitle:"Try your luck with this classic Game Show",guessDoor(l){return P(o,l)},evaluate(l){return R(o,l)},reset(){return $(o)},getSnappState(){return x(o)},address:o};return console.log(t),await u.transaction(S,async()=>{console.log("Deploying Mony Hall Snapp..."),(await A.createSigned(p)).balance.subInPlace(y),t.deploy(y)}).send().wait(),console.log("Deployed..."),s}async function P(a,o){if(!(o===1||o===2||o===3))throw new Error(`${o} is out of range {1, 2, 3}`);const t=new i(a),s=u.transaction(p,async()=>{console.log(`Guessing Door ${o}...`),await t.guessDoor(o)});try{await s.send().wait()}catch(r){console.log(`Transaction Failed! Error: ${r}`)}return`Revealed Door: ${t.revealedDoor}`}async function R(a,o){const t=new i(a),s=u.transaction(p,async()=>{console.log(`Evaluating Game with isSwitcing = ${o}`),await t.evaluate(o)});try{await s.send().wait()}catch(r){console.log(`Transaction Failed! Error: ${r}`)}return t.isWinner?"You win!":"Sorry, you lost."}async function $(a){const o=new i(a);await u.transaction(p,async()=>{console.log("Resetting Snapp"),await o.reset()}).send().wait()}async function x(a){const o=(await u.getAccount(a)).snapp.appState,t=o[0].toString(),s=o[1].toString();return{winningDoor:t,guessedDoor:s}}async function B(){await D}let d,w,S,p,y;D.then(()=>{d=u.LocalBlockchain(),u.setActiveInstance(d),w=d.testAccounts.map(a=>a.privateKey),S=w[0],p=w[1],y=g.fromNumber(1e6)});export{i as MontyHallSnapp,N as deploy,R as evaluate,x as getSnappState,P as guessDoor,B as load,$ as reset};