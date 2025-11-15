import { motion } from 'framer-motion'

interface DescriptorVectorProps {
  values?: number[]
  isAnimating?: boolean
}

export function DescriptorVector({ values, isAnimating = false }: DescriptorVectorProps) {
  const descriptorValues = values || Array.from({ length: 64 }, () => Math.random() * 2 - 1)
  
  const maxValue = Math.max(...descriptorValues.map(Math.abs))

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-8 gap-1">
        {descriptorValues.map((value, index) => {
          const normalizedHeight = (Math.abs(value) / maxValue) * 100
          const isPositive = value >= 0
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isAnimating ? index * 0.02 : 0 }}
            >
              <div className="relative w-full h-16 flex items-end justify-center bg-muted rounded">
                <motion.div
                  className={`w-full rounded-t ${
                    isPositive ? 'bg-primary' : 'bg-secondary'
                  }`}
                  style={{ height: `${normalizedHeight}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${normalizedHeight}%` }}
                  transition={{ duration: 0.5, delay: isAnimating ? index * 0.02 : 0 }}
                />
              </div>
              <span className="text-[8px] mono text-muted-foreground">
                {value.toFixed(1)}
              </span>
            </motion.div>
          )
        })}
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span className="text-sm text-muted-foreground">Valores positivos (dx)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded" />
          <span className="text-sm text-muted-foreground">Valores negativos (dy)</span>
        </div>
      </div>
    </div>
  )
}