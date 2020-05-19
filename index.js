function attempt(available, allowed, preferred) {
    // Пересечение Available и Allowed
     let intersection = available.filter(aItem => {
         return allowed.indexOf(aItem) > -1;
     })
    
     //Если пересечения нет, ответ 0
     let result = [];
     if (intersection.length === 0){
         return result;
     }
 
 
     preferred.forEach(prefItem => {
 
         // ищем пересечение между intersection и желаемыми значениями
         if (intersection.indexOf(prefItem) > -1) {
             result.push(prefItem);
             return;
         }
        
         // Если пересечения нет, ищем ближаишие, сначала большее(а если нет), меньшее значение ближайшее число до желаемого
         let min = intersection[0];
         let max = intersection[intersection.length - 1];
         let minDiff = prefItem - min;
         let maxDiff = Math.abs(prefItem - max);
         intersection.forEach(interItem => {
             if (prefItem - interItem > 0) {
                 if (prefItem - interItem < minDiff) {
                     minDiff = prefItem - interItem;
                     min = interItem;
                 }
             } else {
                 if (Math.abs(prefItem - interItem) < maxDiff) {
                     maxDiff = Math.abs(prefItem - interItem);
                     max = interItem;
                 }
             }
         });
         if (max > prefItem) {
             result.push(max);
             return;
         }
         if (min < prefItem) {
             result.push(min);
             return;
         }
     });
 
     return result;
 }
 
 // test1
 
 let available = [240, 360, 720];
 let allowed = [240, 360, 720, 1080];
 let preferred = [240, 360];
 
 console.log('test1: ', attempt(available, allowed, preferred), ' -> должно быть [240, 360]');
 
 
 // test 2
 
 available = [240];
 allowed = [360, 720];
 preferred = [1080];
 
 console.log('test2: ', attempt(available, allowed, preferred), ' -> должно быть []');
 
 
 // test 3
 
 available = [240, 720];
 allowed = [240, 360, 720, 1080];
 preferred = [240, 360];
 
 console.log('test3: ', attempt(available, allowed, preferred), ' -> должно быть [240, 720]');
 
 
 // test 4
 
 available = [720];
 allowed = [240, 360, 720, 1080];
 preferred = [360];
 
 console.log('test4: ', attempt(available, allowed, preferred), ' -> должно быть [720]');
 
 
 // test 5
 available = [240];
 allowed = [240, 360, 720, 1080];
 preferred = [360];
 
 console.log('test5: ', attempt(available, allowed, preferred), ' -> должно быть [240]');