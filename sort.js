const ENUM = {
	'b' : 'CONST_BIG',
	's' : 'CONST_SAME',
	'l' : 'CONST_LESS',
 }

function createNoneSortArr (arr = [], num){
	if(typeof num !== 'number') return;
	for(let i = num; i > 0; i--) {
			const y = Math.floor(Math.random() * 10);
			arr.push(y)
	}
	return arr
}
function swap (arr,a,b) {
	[arr[b],arr[a]] = [arr[a],arr[b]]
}

function compare (arr,a,b) {
	if(arr[a] > arr[b]) return ENUM.b;
	else if(arr[a] === arr[b]) return ENUM.s
	else return ENUM.l
}

function compareDefault(a,b) {
	if(a>b) return ENUM.b;
	else if (a === b) return ENUM.s
	else return ENUM.l
}

let arr = createNoneSortArr(undefined, 6);
console.log(arr)


// 1.冒泡排序
function bubbleSort(arr, compareFn = compare){
	const { length } = arr;
	for(let i = 0; i < length; i++) {
		for(let j = 0; j < length - i; j++) {
			if(compareFn(arr,j ,j + 1) === ENUM.b) {
				swap(arr,j,j+1)
			}
		}
	}
}
// bubbleSort(arr)

// 2.选择排序
function selecttionSort(arr, compareFn = compare) {
	const { length } = arr;
	let minIndex
	for(let i = 0; i < length; i++) {
		minIndex = i;
		for(let j = i; j < length; j++) {
			if(compareFn(arr,j,minIndex) === ENUM.b) minIndex = j
		}
		swap(arr,i,minIndex)
	}
}
// selecttionSort(arr);

// 3.插入排序
function insertionSort(arr,compareFn = compare) {
	const { length } = arr;
	for(let i = 1; i < length; i++) {
		let j = i
		while(j > 0 && compareFn(arr,j,j-1) === ENUM.b) {
			swap(arr,j,j-1);
			j--
		}
	}
}
// insertionSort(arr)

// 4.归并排序
function merge(left, right, compareFn = compareDefault) {
	let i=0,j=0;
	const result = [];
	while(i < left.length && j < right.length) {
		result.push(compareFn(left[i],right[j]) === ENUM.b ? left[i++] : right[j++])
	}
	const arr = result.concat(i<left.length ? left.slice(i) : right.slice(j));
	return arr
}
function mergeSort(arr, compareFn = compareDefault) {
	if(arr.length > 1) {
		const { length } = arr;
		const middle = Math.floor(length/2);
		const left = mergeSort(arr.slice(0, middle), compareFn);
		const right = mergeSort(arr.slice(middle), compareFn);
		arr = merge(left, right, compareFn)
	}
	return arr
}
// arr = mergeSort(arr)

// 5.快速排序
function quickSort(arr){
        const { length } = arr;
        if(length <= 1) return arr
        const middle = Math.floor(length/2);
        const left = [];
        const right = [];
        for(let i=0; i<length; i++) {
            const value = arr[i]
            if(i !== middle) {
                if(value <= arr[middle]) {
                    left.push(value)
                }else {
                    right.push(value)
                }
            }
        }
        return quickSort(left).concat(arr[middle], quickSort(right))
    }


function quickSort(arr, compareFn = compareDefault) {
	return quick(arr, 0, arr.length - 1, compareFn)
}
function quick(arr, left, right, compareFn) {
	let index;
	if(arr.length > 1) {
		index = partition(arr, left, right, compareFn)
		if(left < index - 1) {
			quick(arr, left, index - 1, compareFn)
		}
		if(index < right) {
			quick(arr, index, right, compareFn)
		}
	}
	return arr
}
function partition(arr, left, right, compareFn) {
	const pivot = arr[Math.floor((right + left)/2)];
	let i = left;
	let j = right;
	while(i <= j) {
		while(compareFn(arr[i], pivot) === ENUM.b) {
			i++
		}
		while(compareFn(arr[j], pivot) === ENUM.l) {
			j--
		}
		if(i<=j) {
			swap(arr, i, j);
			i++;
			j--
		}
	}
	return i
}

// arr = quickSort(arr)

// 6.计数排序
function countingSort(arr) {
	if(arr.length < 2) {
		return arr
	}
	const maxVal = findMaxValue(arr);
	const counts = new Array(maxVal + 1);
	arr.forEach(item=>{
		if(!counts[item] && counts[item] !== 0) {
			counts[item] = 0
		}else counts[item] ++
	})
	let j = 0
	counts.forEach((item,index)=>{
		while(item >= 0) {
			arr[j++] = index
			item--
		}
	})
}
function findMaxValue(arr) {
	let maxVal = arr[0];
	arr.forEach(item=> maxVal = maxVal >= item ? maxVal : item);
	return maxVal
}
countingSort(arr)
