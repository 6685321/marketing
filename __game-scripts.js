var ButtonScript=pc.createScript("buttonScript");ButtonScript.attributes.add("characterPrefab",{type:"entity"}),ButtonScript.prototype.initialize=function(){this.entity.element.on("click",this.onClick,this)},ButtonScript.prototype.onClick=function(t){var i=this.app.root.findByName("Animated Sprite").clone();i.setPosition(-2,1.2,1),this.app.root.addChild(i)};var CharacterScript=pc.createScript("characterScript");CharacterScript.attributes.add("attackInterval",{type:"number",default:1}),CharacterScript.prototype.initialize=function(){this.speed=.3,this.isAttacking=!1,this.attackTimer=0,this.spriteComponent=this.entity.script.animatedsprite,this.app.on("update",this.update,this)},CharacterScript.prototype.update=function(t){this.isAttacking||this.entity.translateLocal(this.speed*t,0,0),this.attackTimer+=t;for(var i=this.app.root.findByTag("Enemy"),a=0;a<i.length;a++){var e=i[a];Math.abs(this.entity.getPosition().x-e.getPosition().x)<=1&&this.attackTimer>=this.attackInterval&&(this.speed=0,this.isAttacking=!0,this.attack(e),this.attackTimer=0)}},CharacterScript.prototype.attack=function(t){var i=t.script.enemyAction;i&&i.health>0&&(i.health-=10,this.entity.sprite.play("Clip 2"),i.health<=0&&t.destroy())};var EnemySpawner=pc.createScript("enemySpawner");EnemySpawner.attributes.add("enemyPrefab",{type:"entity"}),EnemySpawner.attributes.add("gameOverMenu",{type:"entity"}),EnemySpawner.prototype.initialize=function(){this.spawnedEnemies=[],this.maxEnemies=50,this.spawnInterval=.6,this.spawnDelay=1,this.currentSpawnDelay=0,this.spawnEnabled=!0,this.gameOverTimer=0,this.gameOverDelay=2.3},EnemySpawner.prototype.update=function(e){if(this.spawnedEnemies.length>=this.maxEnemies)return this.gameOverTimer+=e,void(this.gameOverTimer>=this.gameOverDelay&&(this.gameOverMenu.enabled=!0));this.currentSpawnDelay-=e,this.currentSpawnDelay<=0&&(this.spawnEnemy(),this.currentSpawnDelay=this.spawnInterval)},EnemySpawner.prototype.spawnEnemy=function(){if(!(this.spawnedEnemies.length>=this.maxEnemies)){var e=this.enemyPrefab.clone(),n=pc.math.random(2,3.5);e.setLocalPosition(n,1.2,1),e.tags.add("Enemy"),this.entity.addChild(e),this.spawnedEnemies.push(e)}};var ButtonArcher=pc.createScript("buttonArcher");ButtonArcher.attributes.add("characterPrefab2",{type:"entity"}),ButtonArcher.prototype.initialize=function(){this.entity.element.on("click",this.onClick,this)},ButtonArcher.prototype.onClick=function(t){var r=this.app.root.findByName("Archer").clone();r.setPosition(-2,1.2,1),this.app.root.addChild(r)};var ButtonMagician=pc.createScript("buttonMagician");ButtonMagician.attributes.add("characterPrefab3",{type:"entity"}),ButtonMagician.prototype.initialize=function(){this.entity.element.on("click",this.onClick,this)},ButtonMagician.prototype.onClick=function(t){var i=this.app.root.findByName("Magician").clone();i.setPosition(-2.5,1.2,1),this.app.root.addChild(i)};var EnemyAction=pc.createScript("enemyAction");EnemyAction.attributes.add("health",{type:"number",default:100}),EnemyAction.prototype.initialize=function(){this.speed=.5,this.targetX=1.5,this.app.on("update",this.update,this)},EnemyAction.prototype.update=function(t){if(this.entity.getLocalPosition().x>this.targetX){var e=-this.speed*t;this.entity.translateLocal(e,0,0)}this.health<=0&&this.entity.destroy()},EnemyAction.prototype.takeDamage=function(t){this.health-=t};var ButtonScript=pc.createScript("buttonScript");ButtonScript.attributes.add("characterPrefab",{type:"entity"}),ButtonScript.prototype.initialize=function(){this.entity.element.on("click",this.onClick,this)},ButtonScript.prototype.onClick=function(t){var i=this.app.root.findByName("Animated Sprite").clone();i.setPosition(-2,1.2,1),this.app.root.addChild(i)};var ArcherAction=pc.createScript("archerAction");ArcherAction.prototype.initialize=function(){this.speed=.2,this.attackInterval=1,this.timeSinceLastAttack=0,this.enemyEntity=this.app.root.findByName("Enemy"),this.enemyCollision=!1,this.app.on("update",this.update,this)},ArcherAction.prototype.update=function(t){this.isAttacking||this.entity.translateLocal(this.speed*t,0,0),this.timeSinceLastAttack+=t;for(var i=this.app.root.findByTag("Enemy"),e=0;e<i.length;e++){var a=i[e];Math.abs(this.entity.getPosition().x-a.getPosition().x)<=2&&this.timeSinceLastAttack>=this.attackInterval&&(this.speed=0,this.isAttacking=!0,this.attack(a),this.timeSinceLastAttack=0)}},ArcherAction.prototype.attack=function(t){var i=t.script.enemyAction;i&&i.health>0&&(i.health-=15,i.health<=0&&t.destroy())};var MagicianAction=pc.createScript("magicianAction");MagicianAction.prototype.initialize=function(){this.speed=.2,this.isAttacking=!1,this.attackInterval=2,this.attackTimer=0,this.enemyEntity=this.app.root.findByName("Enemy"),this.enemyCollision=!1,this.app.on("update",this.update,this)},MagicianAction.prototype.update=function(t){this.isAttacking||this.entity.translateLocal(this.speed*t,0,0);for(var i=this.app.root.findByTag("Enemy"),a=0;a<i.length;a++){var e=i[a];Math.abs(this.entity.getPosition().x-e.getPosition().x)<=3.5&&(this.speed=0,this.isAttacking=!0,this.attack(e))}this.isAttacking&&(this.attackTimer+=t,this.attackTimer>=this.attackInterval&&(this.attackTimer=0,this.isAttacking=!1))},MagicianAction.prototype.attack=function(t){var i=t.script.enemyAction;this.entity.sprite.play("Clip 2"),i&&i.health>0&&(i.health-=20,i.health<=0&&t.destroy())};var DisableButton=pc.createScript("disableButton");DisableButton.prototype.initialize=function(){this.targetEntity=this.app.root.findByName("Homepage"),this.entity.element.on("click",this.onClick,this)},DisableButton.prototype.onClick=function(){this.targetEntity.enabled=!1};