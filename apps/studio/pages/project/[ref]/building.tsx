import { ProjectLayoutWithAuth } from 'components/layouts/ProjectLayout/ProjectLayout'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { NextPageWithLayout } from 'types'

const ProjectBuildingPage: NextPageWithLayout = () => {
  return <RedirectToDashboard />
}

ProjectBuildingPage.getLayout = (page) => (
  <DefaultLayout>
    <ProjectLayoutWithAuth title="Project Building">{page}</ProjectLayoutWithAuth>
  </DefaultLayout>
)

export default ProjectBuildingPage

const RedirectToDashboard = () => {
  const router = useRouter()
  const { ref } = router.query

  useEffect(() => {
    // Use redirect to reload store data properly after project has been
    // been created or unpaused, this is necessarily especially for unpausing
    // so that the dashboard fetches the updated connection strings
    // window.location.replace(`/project/${ref}`)

    // TODO: for experiment only
    // Cos we already pulling new connectionString after project building/restoring
    // just use normal router.push is enough
    router.push(`/project/${ref}`)
  }, [])

  return null
}
