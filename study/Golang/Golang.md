# Golang基础

## 数据类型

### 字符串(string)

```go
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func StringTest() {
	name := " yinhaiyin "
	byteSet := []byte(name)
	fmt.Println(byteSet)
	byteList := []byte{229, 176, 185, 230, 181, 183}
	fmt.Println(string(byteList))

	fmt.Println([]rune(name))

	fmt.Println(
		strings.HasPrefix(name, "yin"),            // 判断前面是否有
		strings.HasSuffix(name, "hai"),            // 后
		strings.Contains(name, "yin"),             // 是否包含
		strings.ToUpper(name),                   // 全大写
		strings.ToLower(name),                   // 全小写
		strings.TrimLeft(name, "yin"),           // 左移除
		strings.TrimRight(name, "yin"),          // 右移除
		strings.Trim(name, " "),                 // 两边移除
		strings.Replace(name, "hai", "hhh", -1), // 替换，替换的次数-1为全部替换
		strings.Split(name, "hai"),              // 切分
	)

	// 字符串拼接
	v1 := "我说怎么走散了"
	v2 := "原来是起风了"
	fmt.Println(fmt.Sprintf("%s,%s,%b", v1, v2, 2))
	v3 := v1 + v2
	fmt.Println(v3)

	v4 := []string{v1, v2}
	v5 := strings.Join(v4, ".")
	fmt.Println(v5)

	var builder = new(strings.Builder)
	builder.WriteString(v1)
	builder.WriteString("---")
	builder.WriteString(v2)
	v6 := builder.String()
	fmt.Println(v6)
	fmt.Println(strconv.Itoa(65))

	data := []rune(v1)
	for index, item := range data {
		fmt.Println(index, string(item))

	}

	// 字节串和字符串的转换
	msg := "hello word"

	byteS := []byte(msg)
	fmt.Println(byteS)

	// 命令行输入
	fmt.Print("输入一个name:")
	var iname []string
	count, err := fmt.Scan(&iname)
	fmt.Println(count, iname, err)
}

```



### 整形

```go
```



### 浮点数

### 数组

```go
package main

import "fmt"

func ArrTest() {
	/*
		内存地址是第一个元素的地址
		内存空间是连续的
		字符串数组存的是指针和长度
	*/
	// 数组
	var Arr [3]string
	Arr[0] = "a"
	Arr[1] = "b"
	Arr[2] = "c"                             // 索引赋值
	Arr = [3]string{"a", "b", "c2"}          // 顺序位置赋值
	Arr = [3]string{1: "a", 0: "b", 2: "c2"} // 给定索引位置赋值
	Abc := [...]string{"b", "c"}             // 声明时赋值可以忽略长度
	fmt.Println(Arr, Abc)

	var number *[3]int        // number -> nil
	var number2 = new([3]int) // number -> [0 0 0]
	fmt.Println(number, number2)

	nums := [3]int8{11, 23, 43}

	fmt.Printf("数组内存地址：%p\n", &nums)
	fmt.Printf("数组第1个元素内存地址：%p\n", &nums[0])
	fmt.Printf("数组第2个元素内存地址：%p\n", &nums[1])
	fmt.Printf("数组第3个元素内存地址：%p\n", &nums[2])

	/*
		可变和拷贝
			可变: 数组内的元素是可以替换的数组的长度是不能改变的
			拷贝:
	*/
	name1 := [2]string{"云海", "yunhai"}
	name2 := name1
	name1[0] = "test"
	fmt.Printf("%s, %s, %p, %p, %d\n", name1, name2, &name1, &name2, len(name1))
	fmt.Println("*************************")

	/*
		长度、索引、切片

	*/
	v1 := [2]string{"云海", "yunhai"}
	fmt.Println(len(v1))
	fmt.Println(v1[0])
	d1 := v1[0]
	v1[0] = "aaa"
	fmt.Println(d1, v1)

	nums2 := [4]int16{12, 89, 33, 44}
	fmt.Println(nums2[0:2])
	for index, item := range nums2 {
		fmt.Println(index, item)
	}

	fmt.Println("****************************")
	// 数组嵌套
	// nums3 := [2][2]int16{{1, 2}, {3, 4}}
	// nums4 := [2][2]int16{[2]int16{1, 2}, [2]int16{3, 4}}
	// fmt.Println(nums3, nums4)
}
```



### 切片

```go
package main

import (
	"fmt"
)

func SliceTest() {
	// 创建切片
	var nums []int
	var data = []int{1, 2, 3}
	// make只用于切片、字典、channel的创建(推荐，这样设置好容量就不必要每次去申请内存)
	// 类型， 初始化数据类型的默认值个数，切片容量
	var nums1 = make([]int, 2, 5)

	// 创建的长度为0，容量为0，但是返回的是一个指针
	var nums2 = new([]int)
	// 指针(nil)
	var nums3 *[]int

	fmt.Println(nums, data, nums1, nums2, nums3)

	// *********************************************************
	// 自动扩容
	// len获取切片长度，cap获取容量， 当make([]int, 3)创建了一个初始化长度为3，容量为3的切片
	var v2 = make([]int, 3)
	var v1 = make([]int, 1, 3)
	fmt.Println("v1", len(v1), cap(v1))
	fmt.Println("v2", len(v2), cap(v2))
	//v1 = []int{1, 2, 3}
	fmt.Println("v1改变", len(v1), cap(v1))

	// 追加数据
	// 当插入数据进去后没有超出容量，此时没有扩容，那么修改v1的值v3里的值也会发生改变，否则v3里的值不会发生改变
	v3 := append(v1, 3, 6)
	fmt.Println(v3, v1)
	v1[0] = 66
	fmt.Println(v3, v1)
	fmt.Printf("%p--%p\n", &v3, &v1)

	fmt.Println("********自动扩容******")
	// 发生扩容的时候v2t的地址就不是v1t的地址，这个时候修改v1t的值v2t就不会变
	v1t := []int{111, 22, 33}
	v2t := append(v1t, 99)

	fmt.Println(v1t, v2t, cap(v1t), cap(v2t))

	fmt.Println("***********长度和容量**********")
	fmt.Println(len(v1t), cap(v1t))

	fmt.Println("***********索引**********")
	// 索引不能超过长度
	fmt.Println(v1t[2])

	fmt.Println("***********切片**********")
	// 只是创建了一个切片指针指向的地址还是v1t中切片第一位的地址但是他的长度不一致,所以改变值都会被修改
	v3t := v1t[0:2]
	v1t[0] = 90
	fmt.Println(v1t[0:2], v3t)

	fmt.Println("***********追加**********")
	// 元素后面...是切片解包
	v4t := make([]int, 1, 3)
	v5t := append(v4t, 2, 3)
	v6t := append(v4t, []int{2, 3}...)
	fmt.Println(v5t, v6t)

	// 删除索引位置的元素, 由于地址是一样的那么后面的会覆盖前面的数据
	// 一般不会删除，【链表】
	delSe := []int{1, 2, 3, 4, 5, 6}
	delIndex := 3
	newSe := append(delSe[:delIndex], delSe[delIndex+1:]...)
	fmt.Println(newSe, delSe) // delSe = [1 2 3 5 6 6]

	fmt.Println("***********插入**********")
	appendIndex := 3
	result := make([]int, 0, len(delSe)+1)
	// 这里必须把前面的赋值给result，否则后面append时会覆盖原数据
	result = append(result, delSe[:appendIndex]...)
	result = append(result, 99)
	result = append(result, delSe[appendIndex:]...)
	fmt.Println(result)

	// 变量赋值
	fmt.Println("***********变量赋值**********")
	// int bool float str 数组	赋值时会重新创建，不会指向同一内存地址
	// 切片时会重新拷贝，但是拷贝的只有指针修改值还是会改变(不扩容),但是使用append扩容后值就会不同了
	k1 := []int{1, 2}
	k2 := k1

	k1 = append(k1, 999)
	k1[0] = 12

	fmt.Printf("%p-%p\n", &k1, &k2)
	fmt.Println(k1, k2)
	k3 := new([]int)
	fmt.Printf("%p\n", k3)
	fmt.Println(len(*k3), cap(*k3))
}
```



### Map

```go
package main

import (
    "fmt"
)

func MapTest() {
    // 键必须为可哈希 int bool string array float
    userInfo := map[string]int{"name": 1, "age": 28}
    userInfo2 := map[string]int{}
    // 通过make创建时，初始化10个键值对的位置
    userInfo3 := make(map[string]int, 10)
    var row map[string]int
    row = userInfo

    value := new(map[string]int)
    value = &userInfo
    fmt.Println(userInfo, userInfo2, userInfo3, row, value)

    userInfo4 := make(map[[2]int]int)
    userInfo4 = map[[2]int]int{{1, 2}: 1}
    fmt.Println(userInfo4)

    fmt.Println("***********长度**********")
    data := map[int]int{1: 2, 2: 3, 4: 5}
    fmt.Println(len(data))

    fmt.Println("***********嵌套**********")

    d1 := map[int]map[string]int{1: {"a": 1}}
    d2 := make(map[string][2]map[int]string)
    d2 = map[string][2]map[int]string{"A": {{1: "a", 2: "b"}, {3: "c", 4: "d"}}}
    d2["n1"] = [2]map[int]string{{1: "a", 2: "b"}, {3: "c", 4: "d"}}
    fmt.Println(d1, d2)

    fmt.Println("***********增删改查**********")
    d3 := make(map[int]string)
    d3[1] = "A"
    d3[1] = "b"
    d3[2] = "c"
    delete(d3, 1)
    fmt.Println(d3[1])

    for key, value := range d3 {
       fmt.Println(key, value)
    }
    for key := range d3 {
       fmt.Println(key, d3[key])
    }
    for _, value := range d3 {
       fmt.Println(value)
    }

    fmt.Println("***********键的嵌套**********")

    d4 := make(map[[2]int]string)
    d4[[2]int{1, 2}] = "a"
    fmt.Println(d4)
}
```



### 结构体

```go
package main

import (
	"fmt"
	"main/utils"
	"reflect"
)

func StructTest() {
	//type xuexi struct {
	//	yuwen  uint8
	//	shuxue uint8
	//}
	//
	//type Person struct {
	//	name  string
	//	age   uint8
	//	email [3]xuexi
	//}
	//
	//var p1 = Person{name: "李东", age: 18, email: [3]xuexi{{yuwen: 0, shuxue: 0}, {yuwen: 0, shuxue: 0}, {yuwen: 0, shuxue: 0}}}
	//
	//fmt.Println(p1)
	fmt.Println("**********定义***********")
	type P1 struct {
		name string
		age  int
	}

	type P2 struct {
		name, address string
		age           int
	}

	type P3 struct {
		name string
		ps2  P2
	}

	type P4 struct {
		kks string
		P1  // 匿名字段，P1 P1,通过 P4.(P1里的属性) 也能直接获取到值
	}

	fmt.Println("**********初始化***********")
	v1 := P1{"name", 18}
	var v2 P1
	v2.name = "name"
	v2.age = 18
	v3 := P1{
		name: "",
		age:  0,
	}

	fmt.Println(v1, v2, v3)

	fmt.Println("**********结构体指针***********")
	v4 := P1{name: "name", age: 12}
	var v5 *P1 = new(P1)
	pv4 := &v4
	fmt.Println(v5, pv4)

	fmt.Println("**********结构体赋值拷贝***********")
	v6 := v4 // 内部全部拷贝一份
	v4.name = "笑死我了"
	fmt.Println(v6, v4)

	p1 := &P1{"a", 18}
	p2 := p1
	p1.name = "哦?"
	fmt.Println(p1, p2)

	fmt.Println("**********结构体嵌套赋值拷贝***********")
	// 本质上都拷贝了，只不过因为有的数据结构保存的是指针，导致数据修改时关联数据也发生了改变，看起来像没有拷贝
	// map、切片	感觉不到拷贝
	// 字符串，array、int等	感觉得到拷贝

	fmt.Println("**********结构体标签***********")
	type MyType struct {
		name string "姓名"
		age  int    "年龄"
	}
	Mp := MyType{"yinhai", 19}

	mpType := reflect.TypeOf(Mp)

	// 方式1
	filed1 := mpType.Field(0)
	fmt.Println(filed1.Tag)

	// 方式2 exist 是否存在这个字段
	filed2, exist := mpType.FieldByName("name")
	fmt.Println(filed2.Tag, exist)

	// 方式三
	fieldNum := mpType.NumField()
	for i := 0; i < fieldNum; i++ {
		field := mpType.Field(i)
		fmt.Println(field.Name, field.Tag)
	}

	fmt.Println("**********类型方法（receiver）***********")
	value := FuncStruct{
		name: "test",
		age:  18,
	}
	value.PrintInfo()

	fmt.Println("**********结构体方法继承***********")
	value2 := SchoolStruct{
		FuncStruct: FuncStruct{
			name: "myname",
			age:  18,
		},
		class: "203班",
	}
	value2.PrintInfo()
	value2.PrintSchoolInfo()

	fmt.Println("**********结构体工厂***********")
	// 当需要读取文件等等操作才能初始化一个结构体的时候使用
	NewFuncStruct("myname", 18)

	// 强制工厂方法, 包结构体变为私有的不让外部导入访问，文件名首字母小写的是私有
	toolPerson := utils.NewPerson("强制工厂", 18)
	toolPerson.PrintInfo()
}

type FuncStruct struct {
	name string "姓名"
	age  int    "年龄"
}

func (i *FuncStruct) PrintInfo() {
	// 结构体方法
	fmt.Println(i.age, i.name)
}

type SchoolStruct struct {
	FuncStruct
	class string
}

func (i *SchoolStruct) PrintSchoolInfo() {
	fmt.Println(i.class, i.name, i.age)
}

func NewFuncStruct(name string, age int) *FuncStruct {
	return &FuncStruct{name: name, age: age}
}
```



