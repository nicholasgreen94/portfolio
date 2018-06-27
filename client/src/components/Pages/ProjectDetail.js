import React from 'react'
import { Link } from 'react-router-dom'

class ProjectDetail extends React.Component{
    state = {
      data: [],
      error: null,
    }


  async componentDidMount() {
    try {
      const res = await fetch(`/api/${this.props.match.params.id}`)
      const project = await res.json()
      this.setState({
        data: project.data[0]
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const state = this.state.data
    return (
      <div className="inner_page">
        { state &&
          <h1 className="project_title">{state.name}</h1>
        }
        { state && state.tags &&
          <div className="tag_wrapper">{
            state.tags.map((tag, i) => {
                if ( i === state.tags.length - 1 ) {
                  return <span key={i} className="project_tags">{tag}</span>
                } else {
                  return <span key={i} className="project_tags">{tag + ','}</span>
                }
              })
            }
          </div>
        }
        <p className="project_description">{state.description}</p>
        <div className="project_link"><a href={state.url} target="_blank" title="Link to a new page" rel="noopener">{state.view_button_text}</a></div>
        { state && state.photos &&
          <div id="photos">
            { state.photos.map((photo, i) => {
                return <div className="photo" key={i}><img src={photo[0]} srcSet={photo[0] + ' 1x,' + photo[1] + ' 2x'} alt={photo[2]} /></div>
            })
        }
        </div>
      }
        </div>
      )
    }
  }

export default ProjectDetail
