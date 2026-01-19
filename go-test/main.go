package main

import (
	"fmt"
	"test/calculator"
)

func main() {
	fmt.Println("Hello, World!")
	var result = calculator.Add(1, 2)
	fmt.Println(result)
}
