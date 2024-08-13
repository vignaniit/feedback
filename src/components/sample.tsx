import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const Sample = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Introduction to Computer Science",
      instructor: "Dr. Jane Doe",
    },
    {
      id: 2,
      name: "Calculus I",
      instructor: "Prof. John Smith",
    },
    {
      id: 3,
      name: "English Composition",
      instructor: "Ms. Sarah Lee",
    },
    {
      id: 4,
      name: "Introduction to Psychology",
      instructor: "Dr. Michael Johnson",
    },
  ])
  const [activeModal, setActiveModal] = useState(null)
  const [formData, setFormData] = useState({
    rating: 0,
    comments: "",
    instructorRating: 0,
    instructorComments: "",
  })
  const handleOpenModal = (courseId) => {
    setActiveModal(courseId)
  }
  const handleCloseModal = () => {
    setActiveModal(null)
    setFormData({
      rating: 0,
      comments: "",
      instructorRating: 0,
      instructorComments: "",
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    handleCloseModal()
  }
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Course Feedback</h1>
            <p className="text-muted-foreground md:text-xl/relaxed">Share your feedback on the courses you've taken.</p>
          </div>
          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <p className="text-muted-foreground">Instructor: {course.instructor}</p>
                  </div>
                  <Button variant="outline" onClick={() => handleOpenModal(course.id)}>
                    Leave Feedback
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={activeModal !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Feedback for {courses.find((c) => c.id === activeModal)?.name}</DialogTitle>
            <DialogDescription>Please share your thoughts on the course and instructor.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Course Rating</Label>
              <Select id="rating" name="rating" value={formData.rating} onValueChange={handleInputChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Share your thoughts on the course"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructorRating">Instructor Rating</Label>
              <Select
                id="instructorRating"
                name="instructorRating"
                value={formData.instructorRating}
                onValueChange={handleInputChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructorComments">Instructor Comments</Label>
              <Textarea
                id="instructorComments"
                name="instructorComments"
                value={formData.instructorComments}
                onChange={handleInputChange}
                placeholder="Share your thoughts on the instructor"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit">Submit Feedback</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Sample