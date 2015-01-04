task :default => [:generate]

task :generate => :clear do
  sh 'jekyll serve'
end

task :clear do
  sh 'rm -rf ./_site/*'
  sh 'rm styles/css/main.css && sass styles/main.scss > styles/css/main.css'
end
