// src/pages/SecuriteAlimentairePage.jsx
import React, { useMemo } from 'react'
import { hasCanon } from '@/utils/domainesCanon'
import { Link } from 'react-router-dom'
import { Wheat, Users, TrendingUp, Package, MapPin, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { projetsEnCours, projetsTermines } from '../data/projetsData'
import amssTerrainActivites from '../assets/amss-terrain-activites.jpeg'
import projetTablesBancs from '../assets/projet-tables-bancs-amss.jpeg'

const CANON_KEY = 'SECALIM'

const TARGET_DOMAIN = 'Sécurité alimentaire & Moyens d’existence'

// helpers
const splitDomains = (label) =>
  String(label || '')
    .split(/[,/|;]+/)
    .map(s => s.trim())
    .filter(Boolean)

const CANON_KEY = 'SECALIM'
const predicateCanon = (p) => hasCanon(p, CANON_KEY)


export default SecuriteAlimentairePage
