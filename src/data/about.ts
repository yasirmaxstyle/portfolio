const about = `
// about.go
package main

import "fmt"

type Person struct {
    Name        string   \`json:"name"\`
    Biography   string   \`json:"biography"\`
    Skills      []string \`json:"skills"\`
    Values      []string \`json:"values"\`
    Interests   []string \`json:"interests"\`
}

func main() {
    me := Person{
        Name: "Muhamad Yasir",
        Biography: \`Passionate fullstack developer 
                   building scalable web applications. I love turning complex 
                   problems into simple, elegant solutions. Always eager to 
                   learn new technologies and share knowledge with the community.\`,
        Skills: []string{
            "React & Next.js",
            "Go & Node.js", 
            "PostgreSQL & MongoDB",
            "Docker",
            "TypeScript & JavaScript",
        },
        Values: []string{
            "Clean, maintainable code",
            "User-centered design",
            "Continuous improvement",
            "Team collaboration",
            "Knowledge sharing",
        },
        Interests: []string{
            "System architecture",
            "Developer experience",
            "Coffee brewing ☕",
        },
    }
    
    fmt.Printf("Hello! I'm %s\\n", me.Name)
}
`

export default about